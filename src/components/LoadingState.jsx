import React from "react";

const LoadingState = () => {
  return (
    <div className="w-full h-[18vh] flex flex-col items-center justify-start pt-8">
      <div className="loading loading-bars loading-md"></div>
      <p className="text-gray-400 mt-4 font-semibold">Loading...</p>
    </div>
  );
};

export default LoadingState;
