import React from "react";
import ReactPlayer from "react-player";

const HeroPlayer = () => {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url="https://www.youtube.com/watch?v=80dqOwAOhbo"
        controls={true}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default HeroPlayer;
