"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";

const Speed = ({ videoRef }) => {
  const [open, setOpen] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState("1");
  const ulref = useRef(null);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleChangeSpeed = (speed) => {
    setSelectedSpeed(speed);
    // set video speed based on the selected speed
    videoRef.current.playbackRate = parseFloat(speed);
    setOpen(false); // hide the list after selecting a speed
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ulref.current && !ulref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    // unbind the event listener
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* speed icons */}
      <span className="cursor-pointer text-white relative">
        <MdSlowMotionVideo size={20} onClick={handleOpen} />
        {open && (
          <ul
            ref={ulref}
            className="absolute flex justify-center items-center flex-col bottom-8 right-0 rounded-xl bg-white w-24 h-40 text-black font-semibold space-y-1"
          >
            <li
              className={`w-full flex justify-center items-center ${
                selectedSpeed === "2" ? "bg-gray-500" : ""
              }`}
              onClick={() => handleChangeSpeed("2")}
              onMouseEnter={() => setSelectedSpeed("2")}
              onMouseLeave={() =>
                setSelectedSpeed(selectedSpeed === "2" ? "2" : "1")
              }
            >
              2x
            </li>

            <li
              className={`w-full flex justify-center items-center ${
                selectedSpeed === "1.5" ? "bg-gray-500" : ""
              }`}
              onClick={() => handleChangeSpeed("1.5")}
              onMouseEnter={() => setSelectedSpeed("1.5")}
              onMouseLeave={() =>
                setSelectedSpeed(selectedSpeed === "1.5" ? "1.5" : "1")
              }
            >
              1.5x
            </li>

            <li
              className={`w-full flex justify-center items-center ${
                selectedSpeed === "1" ? "bg-gray-500" : ""
              }`}
              onClick={() => handleChangeSpeed("1")}
              onMouseEnter={() => setSelectedSpeed("1")}
              onMouseLeave={() =>
                setSelectedSpeed(selectedSpeed === "1" ? "1" : "1")
              }
            >
              Normal
            </li>

            <li
              className={`w-full flex justify-center items-center ${
                selectedSpeed === "0.75" ? "bg-gray-500" : ""
              }`}
              onClick={() => handleChangeSpeed("0.75")}
              onMouseEnter={() => setSelectedSpeed("0.75")}
              onMouseLeave={() =>
                setSelectedSpeed(selectedSpeed === "0.75" ? "0.75" : "1")
              }
            >
              0.75x
            </li>

            <li
              className={`w-full flex justify-center items-center ${
                selectedSpeed === "0.5" ? "bg-gray-500" : ""
              }`}
              onClick={() => handleChangeSpeed("0.5")}
              onMouseEnter={() => setSelectedSpeed("0.5")}
              onMouseLeave={() =>
                setSelectedSpeed(selectedSpeed === "0.5" ? "0.5" : "1")
              }
            >
              0.5x
            </li>
          </ul>
        )}
      </span>
    </>
  );
};

export default Speed;
