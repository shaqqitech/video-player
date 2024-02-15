'use client'
import React from "react";
import { TbScreenshot } from "react-icons/tb";

const Screenshot = ({ videoRef }) => {
    
  const handleScreenShot = () => {
    if(videoRef.current){
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // convert canvas to data url
      const dataURL = canvas.toDataURL('image/png');
      // create a link element to download the screenshot
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = 'screenshot.png';
      // trigger the download
      link.click();
    }  
  };
  
  return (
    <div>
      {/* Screenshot Icon */}
      <TbScreenshot
        size={25}
        className="cursor-pointer"
        onClick={handleScreenShot}
      />
    </div>
  );
};

export default Screenshot;
