import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const FAQs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isDetailPage={true} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mt-8 sm:mt-12 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-center text-sm sm:text-base md:text-lg mb-8 px-4 sm:px-8 md:px-16">
          Find answers to common questions about FrameFinder and how to use our
          service.
        </p>

        <div className="space-y-4 px-2 sm:px-8 md:px-16 lg:px-32 mb-12">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-lg sm:text-xl font-bold">
              What is FrameFinder?
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base">
                FrameFinder is a movie recommendation platform that helps you
                discover new films based on your preferences. We use advanced
                algorithms to suggest movies you're likely to enjoy, making it
                easier to find your next favorite film.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg sm:text-xl font-bold">
              How does FrameFinder's recommendation system work?
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base">
                Our recommendation system analyzes your viewing history,
                ratings, and preferences to suggest movies you might like. We
                also consider factors like genre, director, actors, and overall
                popularity to provide personalized recommendations.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg sm:text-xl font-bold">
              Is FrameFinder free to use?
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base">
                Yes, FrameFinder is completely free to use. You can browse movie
                recommendations, read reviews, and create your watchlist without
                any charge. We may introduce premium features in the future, but
                our core services will always remain free.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg sm:text-xl font-bold">
              Can I watch movies directly on FrameFinder?
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base">
                FrameFinder is a recommendation platform, not a streaming
                service. We provide information about movies and where you can
                watch them, but you'll need to use the respective streaming
                services or rental platforms to actually view the films.
              </p>
            </div>
          </div>

          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-lg sm:text-xl font-bold">
              How can I improve my movie recommendations?
            </div>
            <div className="collapse-content">
              <p className="text-sm sm:text-base">
                To get better recommendations, make sure to rate movies you've
                watched, add films to your watchlist, and regularly use the
                platform. The more information you provide about your
                preferences, the more accurate our recommendations will become.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
