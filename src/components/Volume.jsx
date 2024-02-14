import React, { useState, useEffect } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const Volume = ({ videoRef }) => {
  const [volume, setVolume] = useState(50);
  const [mute, setMute] = useState(videoRef.current ? videoRef.current.volume === 0 : false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [totalTime, setTotalTime] = useState("00:00:00");

  useEffect(() => {
    if (!videoRef.current) return;

    const updateVolume = () => {
      setVolume(videoRef.current.volume * 10);
      setMute(videoRef.current.volume === 0);
    };

    videoRef.current.addEventListener("volumechange", updateVolume);

    return () => {
      videoRef.current.removeEventListener("volumechange", updateVolume);
    };
  }, [videoRef]);

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    setMute(newVolume === "0");
    videoRef.current.volume = newVolume / 10;
  };
  
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
  
    const handleTimeUpdate = () => {
      const current = video.currentTime;
      const total = video.duration;
      setCurrentTime(formatTime(current));
      setTotalTime(formatTime(total));
    };
  
    video.addEventListener("timeupdate", handleTimeUpdate);
  
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoRef]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleVolumeIconClick = () => {
    if (mute) {
      setVolume(50);
      videoRef.current.volume = 0.5;
    } else {
      setVolume(0);
      videoRef.current.volume = 0;
    }
    setMute(!mute);
  };

  return (
    <div className="flex space-x-2 items-center text-white">
      <span onClick={handleVolumeIconClick} className="cursor-pointer">
        {mute ? <FaVolumeMute /> : <FaVolumeUp />}
      </span>
      <input
        type="range"
        className="w-12 h-1"
        min={0}
        max={10}
        value={volume}
        onChange={handleVolumeChange}
      />
      <span className="text-xs">
        {currentTime} / {totalTime}
      </span>
    </div>
  );
};

export default Volume;
