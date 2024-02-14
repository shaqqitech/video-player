"use client";
import React, { useRef, useState } from "react";
import {
  FaBackward,
  FaForward,
  FaPlay,
  FaPause,
} from "react-icons/fa";

const PlayPause = ({ videoRef }) => {
  const [play, setPlay] = useState(true);
  const handlePlayPause = () => {
    if (play) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlay(!play);
  };

  const handleBackward = () => {
    videoRef.current.currentTime -= 5;
  };

  const handleForward = () => {
    videoRef.current.currentTime += 5;
  };
  return (
    <>
      {/* backward, play/pause, forward icons */}
      <span className="flex space-x-2">
        <FaBackward onClick={handleBackward} className="cursor-pointer" />
        <span onClick={handlePlayPause} className="cursor-pointer">
          {play ? <FaPause /> : <FaPlay />}
        </span>
        <FaForward onClick={handleForward} className="cursor-pointer" />
      </span>
    </>
  );
};

export default PlayPause;


