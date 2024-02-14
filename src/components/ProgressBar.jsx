import React, { useEffect, useState } from "react";

const ProgressBar = ({ videoRef }) => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const updateProgress = () => {
      const video = videoRef.current;
      if (video) {
        const progress = (video.currentTime / video.duration) * 100;
        setProgressWidth(`${progress}%`);
      }
    };

    const intervalId = setInterval(updateProgress, 1000);

    return () => clearInterval(intervalId);
  }, [videoRef]);

  const handleProgressBarClick = (event) => {
    const progressBar = event.currentTarget;
    const boundingRect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickPercentage = (clickX / progressBarWidth) * 100;
    const video = videoRef.current;
    if (video) {
      const newTime = (clickPercentage / 100) * video.duration;
      video.currentTime = newTime;
    }
  };

  return (
    <div
      className="w-full mx-4 flex justify-start items-center relative"
      onClick={handleProgressBarClick}
    >
      <div className="absolute w-full h-1 bg-slate-500 cursor-pointer rounded-full"></div>
      <div
        style={{ width: progressWidth }}
        className="absolute h-1 bg-blue-500 cursor-pointer rounded-full"
      >
        <div className="absolute -top-1 right-0 transform translate-x-full h-3 w-3 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
