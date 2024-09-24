// MenuDrawer.jsx
import React from "react";

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
            <a href="/" className="py-3">
              Home
            </a>
          </li>
          <li>
            <details>
              <summary className="py-3">Categories</summary>
              <ul className="pl-4">
                <li>
                  <a className="py-2">Action</a>
                </li>
                <li>
                  <a className="py-2">Comedy</a>
                </li>
                <li>
                  <a className="py-2">Drama</a>
                </li>
                <li>
                  <a className="py-2">Sci-Fi</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a href="/favorites" className="py-3">
              My Favorites
            </a>
          </li>
          <li>
            <a href="/help" className="py-3">
              FAQs
            </a>
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
