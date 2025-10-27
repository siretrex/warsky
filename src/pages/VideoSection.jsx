import React from "react";
import videobg from "../assets/124683-731575432.mp4";

const VideoSection = () => {
  return (
    <div className="relative w-full h-full">
      <video
        src={videobg}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black/80"></div>
    </div>
  );
};

export default VideoSection;
