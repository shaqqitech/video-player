"use client";
import React, { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Volume = ({ videoRef }) => {
  const [volume, setVolume] = useState(5);
  const [mute, setMute] = useState(volume === 0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [totalTime, setTotalTime] = useState("00:00");

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    if (newVolume === "0") {
      setMute(true);
    } else {
      setMute(false);
    }
    videoRef.current.volume = newVolume / 10;
  };

  useEffect(() => {
    const handleTimeUpdate = () => {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(formatTime(current));
      setTotalTime(formatTime(total));
    };

    videoRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      videoRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  const formatTime = (time) => {
    // Calculate the number of minutes
    const minutes = Math.floor(time / 60);
    // Calculate the number of remaining seconds after subtracting the minutes
    const seconds = Math.floor(time % 60);
    // Convert the minutes and seconds to strings and pad them with leading zeros if necessary
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleVolumeIconClick = () => {
    if (mute) {
      setVolume(0);
      videoRef.current.volume = 0;
    } else {
      setVolume(5);
      videoRef.current.volume = 0.5; // Default volume when unmuted
    }
    setMute(!mute);
  };

  return (
    <>
      <div className="flex space-x-2 items-center">
        {/* volume icons */}
        <span onClick={handleVolumeIconClick} className="cursor-pointer">
          {mute ? <FaVolumeMute /> : <FaVolumeUp />}
        </span>
        {/* volume range slider */}
        <input
          type="range"
          className="w-12"
          min={0}
          max={10}
          value={volume}
          onChange={handleVolumeChange}
        />
        {/* video time */}
        <span className="text-xs">
          {currentTime} / {totalTime}
        </span>
      </div>
    </>
  );
};

export default Volume;
