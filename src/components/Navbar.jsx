// NavBar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import NotificationDrawer from "./NotificationDrawer";
import MenuDrawer from "./MenuDrawer";
import { getMovieNotifications } from "../services/api";
import "../custom-theme.css";

const NavBar = ({ isDetailPage = false }) => {
  const { theme, setTheme } = useTheme();
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      const movieNotifications = await getMovieNotifications();
      setNotifications(movieNotifications);
    };
    fetchNotifications();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "sunset" ? "winter" : "sunset";
    setTheme(newTheme);
  };

  const toggleMenuDrawer = () => {
    setIsMenuDrawerOpen(!isMenuDrawerOpen);
  };

  const toggleNotificationDrawer = () => {
    setIsNotificationDrawerOpen(!isNotificationDrawerOpen);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 py-2 z-50 mx-24">
      <div className="drawer">
        <input
          id="my-menu-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isMenuDrawerOpen}
          onChange={toggleMenuDrawer}
        />
        <div className="drawer-content">
          <div className="drawer drawer-end">
            <input
              id="notification-drawer"
              type="checkbox"
              className="drawer-toggle"
              checked={isNotificationDrawerOpen}
              onChange={toggleNotificationDrawer}
            />
            <div className="drawer-content">
              <div className="navbar bg-base-100 py-2 px-8 rounded-xl">
                <div className="navbar-start">
                  {isDetailPage ? (
                    <button
                      onClick={handleBackClick}
                      className="btn btn-ghost btn-circle"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                  ) : (
                    <label
                      htmlFor="my-menu-drawer"
                      className="btn btn-ghost btn-circle drawer-button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                    </label>
                  )}
                </div>
                <div className="navbar-center">
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.reload();
                    }}
                  >
                    <h1 className="btn btn-ghost font- text-2xl text-theme-adaptive">
                      🎬 FrameFinder.
                    </h1>
                  </a>
                </div>
                <div className="navbar-end">
                  <label className="swap swap-rotate btn btn-ghost btn-circle">
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "winter"}
                    />
                    <svg
                      className="swap-on h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    <svg
                      className="swap-off h-5 w-5 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                  </label>
                  <label
                    htmlFor="notification-drawer"
                    className="btn btn-ghost btn-circle drawer-button"
                  >
                    <div className="indicator z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <NotificationDrawer
              onClose={() => setIsNotificationDrawerOpen(false)}
              notifications={notifications}
            />
          </div>
        </div>
        <MenuDrawer onClose={() => setIsMenuDrawerOpen(false)} />
      </div>
    </div>
  );
};

export default NavBar;
