import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GameCards from "../../components/GameCards/GameCards";
import GameModal from "../../components/GameCards/GameModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import "./Game.css";

import games_page from "../../assets/img/games_page.webp";
import gamesData from "../../../public/games.json"; 

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const [randomGame, setRandomGame] = useState(null);

  useEffect(() => {
    if (gamesData.games && gamesData.games.length > 0) {
      const randomIndex = Math.floor(Math.random() * gamesData.games.length);
      setRandomGame(gamesData.games[randomIndex]);
    }
  }, []);
  return (
    <div>
      <Navbar />

      {randomGame && (
        <div className="flex pt-[70px] w-100vh gap-[30px] pl-[70px] pb-[50px] justify-center bg-[#141414]  overflow-hidden">
          <img
            src={randomGame.images?.cover}
            alt={randomGame.title}
            className=" game-img w-[500px] h-[520px] object-cover"
          />

          <div className="about flex flex-col  text-[#fff] w-full ">
            <div className="text-[28px] font-[500] ">
              Play{" "}
              <span className="text-[30px] font-[500]">{randomGame.title}</span>{" "}
              Now
            </div>

            <div className="text-[20px] max-w-[600px] pt-[20px] pb-[10px] ">
              {randomGame.description}
            </div>

            <div className="flex gap-[10px] items-center text-[#aaa] text-[15px] mb-[8px] ">
              <span>{randomGame.releaseYear}</span>
              <span className="text-[#fff] border px-[5px] ">HD</span>
              <span>{randomGame.modes}</span>
              <span>{randomGame.languages?.join(", ")}</span>
            </div>

            <div className="text-[15px] text-[#aaa] mb-[4px] ">
              Genres:
              <span className="text-[#fff] pl-2">
                {randomGame.genres?.join(", ")}
              </span>
            </div>

            <div className="text-[15px] text-[#aaa] mb-[12px] ">
              Developer:
              <span className="text-[#fff] pl-2">{randomGame.developer}</span>
            </div>

            <div className="flex gap-[10px] ">
              <button className="btn border cursor-pointer text-[#aaa] rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-[20px] text-[#fff]"
                />
              </button>
              <button className="btn border cursor-pointer text-[#aaa] rounded-full w-[40px] h-[40px] flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="text-[20px] text-[#fff]"
                />
              </button>
            </div>
          </div>
        </div>
      )}

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
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
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
