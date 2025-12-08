import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GameCards from "../../components/GameCards/GameCards";
import Modal from "../../components/GameCards/Modal";
import "./Game.css";

import games_page from "../../assets/img/games_page.webp";

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  
  const [randomGame, setRandomGame] = useState(null); 

  return (
    <div>
      <Navbar />

      <div
        className="h-[200px] pt-[50px] flex justify-center items-center z-0 bg-cover bg-center rounded-[10px]"
        style={{
          backgroundImage: randomGame
            ? `url(${randomGame.background})`
            : "none",
        }}
      >
        {!randomGame && <p>:)</p>}
      </div>

      <div className="category-cards relative  ">
        <GameCards
          title="Popular Mobile Games for You"
          genres="Action"
          onGameClick={setSelectedGame}
        />

        <GameCards
          title="Pick Up and Play Mobile Games"
          genres="Puzzle"
          onGameClick={setSelectedGame}
        />
      </div>

      {selectedGame && (
        <Modal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}

      <div className="h-[320px] mt-[30px] bg-[#000]  flex justify-between">
        <div className="txt-box ml-[30px] flex flex-col justify-center">
          <h2 className="font-[600] text-[32px] font-unset">
            Find more games in the mobile app
          </h2>
          <h6 className="font-[400] text-[16px]  font-unset">
            From familiar favorites to Netflix exclusives, get unlimited mobile
            games in the Netflix app — all included with your membership.
          </h6>
        </div>

        <img
          src={games_page}
          className="w-[55%] flex object-cover pt-[20px]"
          alt=""
        />
      </div>

      <Footer />
    </div>
  );
};

export default Games;
