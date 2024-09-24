// NotificationDrawer.jsx
import React, { useState, useEffect } from "react";
import { getMovieNotifications } from "../services/api"; // Update the import path as needed

const NotificationCard = ({ notification, onDelete }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleDelete = () => {
    setIsClosing(true);
    setTimeout(() => onDelete(notification.id), 300);
  };

  return (
    <div
      className={`mb-4 transition-all duration-300 ease-in-out ${
        isClosing ? "opacity-0 transform translate-x-full" : ""
      }`}
    >
      <div className="card bg-base-100 shadow-xl overflow-hidden relative">
        <div className="card-body p-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary mr-4 flex-shrink-0">
              <img
                src={
                  notification.poster !== "N/A"
                    ? notification.poster
                    : `https://api.dicebear.com/6.x/initials/svg?seed=${notification.title}`
                }
                alt="Movie Poster"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex-grow pr-8">
              <h3 className="card-title text-sm">{notification.title}</h3>
              <p className="text-xs">{notification.content}</p>
            </div>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationDrawer = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const movieNotifications = await getMovieNotifications(10);
      setNotifications(movieNotifications);
    };
    fetchNotifications();
  }, []);

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="drawer-side z-[9999]">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Finder News</h2>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            ✕
          </button>
        </div>
        <ul>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onDelete={deleteNotification}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationDrawer;
