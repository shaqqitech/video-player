'use client'
import React, { useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

const FullScreen = ({videoRef}) => {
    const [fullscreen, setFullscreen] = useState(true);

    const handleToggleFullScreen = () => {
        setFullscreen(!fullscreen);
        if(document.fullscreenElement){
            // if full screen is enabled then exit full screen
            document.exitFullscreen();
        }else{
            // if full screen is disabled then enter full screen
            videoRef.current.requestFullscreen();
        }
    };

  return (
    <>
      {/* Full/Half screen */}
      <span className="flex space-x-2 text-white">
        <span
          onClick={handleToggleFullScreen}
          className="cursor-pointer"
        >
          {fullscreen ? (
            <MdFullscreen size={25} />
          ) : (
            <MdFullscreenExit size={25} />
          )}
        </span>
      </span>
    </>
  );
};

export default FullScreen;
