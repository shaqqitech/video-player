"use client";
import React, { useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import PlayPause from "./PlayPause";
import Volume from "./Volume";
import Speed from "./Speed";
import PicInPic from "./PicInPic";
import FullScreen from "./FullScreen";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import Screenshot from "./Screenshot";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [showController, setShowController] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showSelectFile, setShowSelectFile] = useState(true);

  // Function to show the controller
  const showControllerHandler = () => {
    setShowController(true);
  };

  // Function to hide the controller
  const hideControllerHandler = () => {
    setShowController(false);
  };

  // Function to handle video selection
  const handleVideoSelection = (event) => {
    const file = event.target.files[0];
    const fileURL = URL.createObjectURL(file);
    setSelectedVideo(fileURL);
    setShowSelectFile(false); // Hide the "Select a file" div
  };

  // Function to handle video end
  const handleVideoEnd = () => {
    // Restart the video when it ends
    videoRef.current.play();
  };

  // Go back functionality
  const handleGoBack = () => {
    if (videoRef.current) {
      videoRef.current.removeEventListener("ended", handleVideoEnd);
    }
    setShowController(false);
    setSelectedVideo(null); // Set selected video to null
    setShowSelectFile(true); // Show the "Select a file" div again
  };

  const handleSelectFileClick = () => {
    document.getElementById("fileInput").click();
  };



  return (
    <>
      {showSelectFile && (
        <div
          className="w-[700px] h-96 border-4 border-white flex justify-center items-center overflow-hidden flex-col relative rounded-xl cursor-pointer text-white"
          onClick={handleSelectFileClick}
        >
          <Image src={"/image.png"} alt="Image" width={300} height={300} />
          <div className="font-bold text-xl w-full text-center text-white">
            Select a file from the{" "}
            <span className="text-blue-600">Storage</span>
          </div>
        </div>
      )}
      <main
        className={`w-[700px] h-96 border-4 border-white flex justify-center items-center overflow-hidden flex-col relative rounded-xl ${
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

        {showController && selectedVideo && (
          <span
            onClick={handleGoBack}
            className="absolute cursor-pointer top-5 left-5 p-1 bg-black/80 rounded-full"
          >
            {/*--------------------- Go Back Icons ---------------------*/}
            <IoMdArrowRoundBack />
          </span>
        )}

        {/* -------------- Controller Components */}
        {(showController || !selectedVideo) && (
          <div className="absolute flex justify-between items-center flex-col space-y-2 w-full h-16 bottom-0 left-0">
            {/*--------------------- Progress Bar component ---------------------*/}
            <div className="w-full mx-4 flex justify-center items-center">
            <ProgressBar videoRef={videoRef} />
            </div>
            <div className="w-full flex h-full absolute justify-between items-center px-5">
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
                {/* Screenshot component */}
                <Screenshot videoRef={videoRef} />
              </div>
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
