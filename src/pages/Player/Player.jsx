import React from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/img/back_arrow_icon.png";

const Player = () => {
  return (
    <div className="player">
      <img src={back_arrow_icon} alt="" />
      <iframe
        width="90%"
        height="90%"
        src={
          "https://www.youtube.com/embed/yL2JgT04ULw&list=RDyL2JgT04ULw&start_radio=1" 
        } title="trailer" frameBorder='0' allowFullScreen
      ></iframe>

      <div className="player">
        <p>Published Date</p>
        <p>Name</p>
        <p>Type</p>
      </div>
    </div>
  );
};

export default Player;
