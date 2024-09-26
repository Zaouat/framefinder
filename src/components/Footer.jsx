import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer text-theme-adaptive p-4 gradient-theme-adaptive-footer">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start">
          <aside className="flex flex-col items-center sm:items-start mb-8 sm:mb-0">
            <div className="navbar-center">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === "/") {
                    window.location.reload();
                  } else {
                    window.location.href = "/";
                  }
                }}
                className="btn btn-ghost font-bold text-xl sm:text-2xl text-theme-adaptive"
              >
                🎬 FrameFinder.
              </a>
            </div>
            <p className="text-center sm:text-left mt-2 mb-2 text-sm font-semibold sm:pl-4">
              FrameFinder © 2024 | Crafted with ❤️ by{" "}
              <a
                href="https://github.com/zaouat"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Zaouat
              </a>
            </p>
          </aside>

          <div className="flex flex-col items-center sm:items-end w-full sm:w-auto">
            <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-6 mb-4 sm:mb-8  pr-4">
              <Link
                to="/about"
                className="link link-hover font-semibold smalltext-theme-adaptive"
                onClick={() => setTimeout(() => window.scrollTo(0, 0), 0)}
              >
                About Me
              </Link>
              <a
                href="mailto:zaouatabdellah@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover font-semibold smalltext-theme-adaptive"
              >
                Get in Touch
              </a>
              <a
                className="link link-hover font-semibold smalltext-theme-adaptive"
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                API
              </a>
            </nav>

            <div className="flex gap-2">
              <a
                href="https://x.com/AbdellaZaouat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <img src="/x.svg" alt="X Zaouat" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdellah-zaouat-17a628198"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <img src="/linkedin.svg" alt="LinkedIn Zaouat" />
              </a>
              <a
                href="https://github.com/Zaouat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <img src="/github.svg" alt="Github Zaouat" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
