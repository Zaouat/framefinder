// MenuDrawer.jsx
import React from "react";
import { Link } from "react-router-dom";

const MenuDrawer = ({ onClose }) => {
  return (
    <div className="drawer-side z-[9999]">
      <label
        htmlFor="my-menu-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="btn btn-circle btn-ghost">
            ✕
          </button>
        </div>

        <ul className="menu text-md font-semibold font-biennale flex-grow">
          <li>
            <Link to="/" className="py-3" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            <details>
              <summary className="py-3">Categories</summary>
              <ul className="pl-4">
                <li>
                  <Link
                    to="/category/action"
                    className="py-2"
                    onClick={onClose}
                  >
                    Action
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/comedy"
                    className="py-2"
                    onClick={onClose}
                  >
                    Comedy
                  </Link>
                </li>
                <li>
                  <Link to="/category/drama" className="py-2" onClick={onClose}>
                    Drama
                  </Link>
                </li>
                <li>
                  <Link
                    to="/category/sci-fi"
                    className="py-2"
                    onClick={onClose}
                  >
                    Sci-Fi
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/favorites" className="py-3" onClick={onClose}>
              My Favorites
            </Link>
          </li>
          <li>
            <Link to="/faqs" className="py-3" onClick={onClose}>
              FAQs
            </Link>
          </li>
        </ul>
        <div className="mt-auto pt-4">
          <h1 className="btn btn-ghost text-xl text-theme-adaptive w-full justify-start">
            🎬 FrameFinder.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
