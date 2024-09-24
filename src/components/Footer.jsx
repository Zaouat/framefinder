import React from "react";

const Footer = () => {
  return (
    <footer className="footer text-theme-adaptive p-2 pt-2 px-24 gradient-theme-adaptive-footer">
      <div className="w-full flex flex-col md:flex-row justify-between items-start">
        <aside className="flex items-center mb-8">
          <div className="navbar-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              <h1 className="btn btn-ghost font-bold text-2xl text-theme-adaptive mt-6">
                🎬 FrameFinder.
              </h1>
            </a>

            <p className="pl-4 mt-2 mb-2 font-semibold">
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
          </div>
        </aside>

        <div className="flex flex-col items-end">
          <nav className="flex flex-wrap justify-end md:flex-row items-center gap-6 mb-8 pt-8">
            <a className="link link-hover font-semibold smalltext-theme-adaptive">
              About Me
            </a>
            <a className="link link-hover font-semibold smalltext-theme-adaptive">
              Get in Touch
            </a>
            <a
              className="link link-hover font-semibold smalltext-theme-adaptive"
              href="https://www.omdbapi.com/"
              target="_blank"
            >
              API
            </a>
          </nav>

          <div className="flex gap-2">
            <a
              href="https://x.com/AbdellaZaouat"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle btn-md"
            >
              <img src="/x.svg" className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/abdellah-zaouat-17a628198"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle btn-md"
            >
              <img src="/linkedin.svg" className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Zaouat"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-circle btn-md"
            >
              <img src="/github.svg" className="w-5 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
