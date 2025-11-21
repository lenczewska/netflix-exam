import React from "react";
import "./Player.css";
import trailer from "../../assets/video/trailer.mp4";
import back_arrow_icon from "../../assets/img/back_arrow_icon.png";
import { useNavigate } from "react-router-dom";

const HeroPlayer = () => {
  const navigate = useNavigate();

  return (
    <div className="player-container">
      <div className="player">
        <img
          onClick={() => navigate(-1)}
          src={back_arrow_icon}
          className="absolute top-[20px] left-[20px] w-[50px] cursor-pointer z-50"
          alt="Back"
        />
        <video src={trailer} autoPlay loop controls muted></video>
      </div>
    </div>
  );
};

export default HeroPlayer;
