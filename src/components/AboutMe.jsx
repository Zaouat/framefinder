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
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-16 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-start space-y-8 lg:space-y-0 lg:space-x-12 mb-12 max-w-6xl mx-auto">
          <div className="w-full lg:w-1/2">
            <img
              src="/zaouat.png"
              alt="Zaouat Abdellah"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 ">
              Zaouat Abdellah
            </h1>
            <h3 className="text-lg sm:text-xl mb-6 ">
              Frontend Flutter Developer
            </h3>
            <div className="space-y-4 sm:space-y-6 mb-8">
              <p>
                Hello! I'm Abdellah Zaouat, a passionate front-end Flutter
                developer with a keen interest in creating intuitive and
                efficient mobile applications. My journey in the world of
                development has been driven by a constant desire to learn and
                innovate.
              </p>
              <p>
                My expertise lies in Flutter development, where I've created
                various applications ranging from e-commerce platforms to
                minimalistic music players. I'm also well-versed in front-end
                web technologies, continuously improving my skills in ReactJs to
                broaden my development capabilities.
              </p>
              <p>
                Beyond coding, I'm fascinated by the potential of the Metaverse
                and its implications for future digital interactions. I enjoy
                exploring new technologies and their potential applications in
                solving real-world problems.
              </p>
              <p>
                When I'm not immersed in lines of code, you might find me
                contributing to open-source projects, watching the latest TV
                series, or engaging in discussions about the future of
                technology. I'm always open to new challenges and opportunities
                to grow as a developer.
              </p>
              <p>
                Feel free to reach out if you want to discuss Flutter
                development, front-end technologies, or if you're interested in
                collaborating on exciting projects. Let's create something
                amazing together!
              </p>
            </div>
            <h3 className="mb-4 text-xl">Connect with me:</h3>
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
                href="https://twitter.com/AbdellaZaouat"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-circle btn-md group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-5 transition-colors duration-200 group-hover:text-primary"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
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
