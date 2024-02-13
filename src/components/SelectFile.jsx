import Image from "next/image";
import React from "react";

const SelectFile = () => {
  return (
    <div
      className="w-1/2 h-96 border-2 border-white flex justify-center items-center overflow-hidden flex-col relative rounded-xl cursor-pointer"
      onClick={handleSelectFileClick}
    >
      <Image src={"/image.png"} alt="Image" width={300} height={300} />
      <div className="font-bold text-xl w-full text-center">
        Select a file from the <span className="text-blue-600">Storage</span>
      </div>
    </div>
  );
};

export default SelectFile;
