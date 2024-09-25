import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const AboutMe = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12 mb-12 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2">
            <img
              src="/zaouat.png"
              alt="Zaouat Abdellah"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Zaouat Abdellah
            </h1>
            <p className="text-lg sm:text-xl mb-6">
              Passionate Full Stack Developer | Movie Enthusiast | Creator of
              FrameFinder
            </p>
            <div className="space-y-4 sm:space-y-6 mb-8">
              <p>
                Hello! I'm Abdellah Zaouat, a dedicated full-stack developer
                with a love for creating intuitive and powerful web
                applications. My journey in the world of coding has led me to
                develop FrameFinder, a platform born out of my passion for both
                technology and cinema.
              </p>
              <p>
                With FrameFinder, I aimed to create a tool that not only helps
                movie enthusiasts discover new films but also provides a
                seamless, enjoyable experience in exploring the vast world of
                cinema. This project showcases my skills in front-end design,
                back-end development, and API integration, all while focusing on
                user experience and performance.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies,
                watching the latest films, or contributing to open-source
                projects. I believe in the power of technology to enhance our
                daily lives and am always excited to take on new challenges in
                the ever-evolving landscape of web development.
              </p>
            </div>
            <h3 className="mb-4 text-xl">Contact Me:</h3>
            <div className="flex justify-start space-x-4">
              <a
                href="https://www.linkedin.com/in/abdellah-zaouat-17a628198"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-4 h-4 transition-colors duration-200 group-hover:text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
              <a
                href="https://github.com/Zaouat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-6 transition-colors duration-200 group-hover:text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMe;
