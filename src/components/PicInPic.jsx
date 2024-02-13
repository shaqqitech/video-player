"use client";
import React from "react";
import { BsPip } from "react-icons/bs";

const PicInPic = ({ videoRef }) => {
  const handleTogglePip = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else {
      videoRef.current.requestPictureInPicture();
    }
  };

  return (
    <>
      {/* Pic in Pic icons */}
      <span className="cursor-pointer" onClick={handleTogglePip}>
        <BsPip size={20} />
      </span>
    </>
  );
};

export default PicInPic;
