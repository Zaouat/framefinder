import React, { useEffect, useState, useMemo } from "react";
import Lottie from "react-lottie";
import animationData from "../../public/movie.json";

const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  const defaultOptions = useMemo(
    () => ({
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid meet",
      },
    }),
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-theme-adaptive">
      <div style={{ width: "100%", maxWidth: "100px", maxHeight: "100px" }}>
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h2 className="text-2xl font-bold text-white mt-4">Loading...</h2>
    </div>
  );
};

export default PageTransition;
