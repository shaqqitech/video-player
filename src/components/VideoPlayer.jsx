"use client";
import React, { useRef, useState } from "react";
import PlayPause from "./PlayPause";
import Volume from "./Volume";
import Speed from "./Speed";
import PicInPic from "./PicInPic";
import FullScreen from "./FullScreen";
import Image from "next/image";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [showController, setShowController] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showSelectFile, setShowSelectFile] = useState(true);

  // Function to show the controller and reset timeout
  const showControllerHandler = () => {
    setShowController(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setShowController(false), 3000);
  };

  // Function to hide the controller
  const hideControllerHandler = () => {
    setShowController(false);
  };

  // Timeout ID for hiding controller
  let timeoutId;

  // Function to handle video selection
  const handleVideoSelection = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setSelectedVideo(fileURL);
    setShowSelectFile(false); // Hide the "Select a file" div
  };

  // Function to handle clicking on "Select a file" div
  const handleSelectFileClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function to handle video end
  const handleVideoEnd = () => {
    // Restart the video when it ends
    videoRef.current.play();
  };

  return (
    <>
      {showSelectFile && (
        <div
          className="w-1/2 h-96 border-2 border-white flex justify-center items-center overflow-hidden flex-col relative rounded-xl cursor-pointer"
          onClick={handleSelectFileClick}
        >
          <Image src={"/image.png"} alt="Image" width={300} height={300} />
          <div className="font-bold text-xl w-full text-center">
            Select a file from the{" "}
            <span className="text-blue-600">Storage</span>
          </div>
        </div>
      )}
      <main
        className={`w-1/2 h-96 border-2 border-white flex justify-center items-center overflow-hidden flex-col relative rounded-xl ${
          selectedVideo ? "" : "hidden"
        }`}
        onMouseEnter={showControllerHandler}
        onMouseLeave={hideControllerHandler}
      >
        {selectedVideo && (
          <video
            ref={videoRef}
            className="absolute w-full h-full"
            preload="metadata"
            autoPlay
            loop
            onEnded={handleVideoEnd}
          >
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* -------------- Controller Component */}
        {showController && selectedVideo && (
          <div className="absolute flex justify-between items-center px-5 w-full h-16 bottom-0 left-0">
            {/*--------------------- Left side component ---------------------*/}
            <Volume videoRef={videoRef} />

            {/*------------------ Middle component ------------------*/}
            <PlayPause videoRef={videoRef} />

            {/*--------------- Right Side component ---------------*/}
            <div className="flex space-x-3">
              {/* speed component */}
              <Speed videoRef={videoRef} />
              {/* PiP component */}
              <PicInPic videoRef={videoRef} />
              {/* Full/Half screen component */}
              <FullScreen videoRef={videoRef} />
            </div>
          </div>
        )}
      </main>
      <input
        id="fileInput"
        type="file"
        accept="video/*"
        onChange={handleVideoSelection}
        className="hidden"
      />
    </>
  );
};

export default VideoPlayer;
