import { useEffect, useState } from "react";
import "./GameCards.css";
import qr_code from "../../assets/img/qr_code.jpg";
import app_store from "../../assets/img/app_store.svg";
import google_play from "../../assets/img/google_play.svg";
import game_banner from "../../assets/img/game_banner.svg";
import logo_header from "../../assets/img/logo_header.png";

function GameCards({ title, genres }) {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

 useEffect(() => {
  fetch("/games.with-genres.updated.json")
    .then((res) => res.json())
    .then((data) => {
      const filtered = genres
        ? data.games.filter((game) => {
            // если жанр есть и совпадает → показываем
            if (game.genres && game.genres.includes(genres)) return true;
            // если жанра нет или он был "Unknown" → всё равно показываем
            if (!game.genres || game.genres.includes("Unknown")) return true;
            return false;
          })
        : data.games;

      setGames(filtered);
    });
}, [genres]);


  return (
    <>
      <h2 className="mb-[10px] text-[24px] font-[500]">{title}</h2>

      <div className="flex flex-wrap gap-[15px]">
        <div className="card-list overflow-x-scroll flex gap-[10px]">
          {games.map((game) => (
            <div key={game.id} className="flex flex-col items-center">
              <div
                className="w-[160px] h-[160px] bg-white rounded-[20px] shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedGame(game);
                }}
              >
                <img
                  src={game.images.cover}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="w-[100px] break-words whitespace-normal mt-[2px] font-semibold text-gray-800 text-center">
                {game.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className=" modal-box [w-800px] rounded-[] h-screen mr-[150px] ml-[100px] flex justify-center items-center   bg-[#181818]  z-100">
          <div className="flex flex-col ">
            <div className="about-box">
              <div className="w-auto gap-[15px] flex items-center">
                <img
                  src={selectedGame?.images?.cover}
                  alt={selectedGame?.title}
                  className="w-[110px] h-[100px]  rounded-[15px] object-center"
                />

                <div className="">
                  <img src={logo_header} alt="logo" className="w-[60px]" />

                  <h2 className="text-[20px]">{selectedGame?.title}</h2>
                  <p>Mobile Game</p>
                  <p>{selectedGame?.category}</p>
                </div>
              </div>
            </div>

            <div className="download-box flex justify-between items-center w-[800px] h-[150px] p-[20px] rounded-[10px]">
              <div className="left-box mt-[10px] flex gap-[10px] ml-[20px] ">
                <div className="qr-box">
                  <img
                    src={qr_code}
                    alt="qr-netflix"
                    className="w-[120px] rounded-[4px] "
                  />
                </div>

                <div className="text-box flex flex-col gap-[3px] w-[350px]">
                  <h2 className="text-[#fff] font-[700] text-[19px] ">
                    Scan to download on mobile
                  </h2>
                  <p className="text-[#fff] text-[14px] ">
                    Included with your membership. No ads, extra fees or in-app
                    purchases.
                  </p>

                  <div className="a-img flex gap-[10px] ">
                    <a href="">
                      <img
                        src={app_store}
                        alt="app-store"
                        className="w-[117px] "
                      />
                    </a>

                    <a href="">
                      <img
                        src={google_play}
                        alt="google-play"
                        className="w-[130px] "
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="right-box">
                <img src={game_banner} alt="game_banner" />
              </div>
            </div>

            <div className="inf-box mt-[40px]">
              <h2 className="text-[25px] font-[500] mb-[10px]">
                About <span className="text-[#fff]">{selectedGame?.title}</span>
              </h2>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Category:{" "}
                <span className="text-[#fff]">{selectedGame?.category}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Modes:{" "}
                <span className="text-[#fff]">{selectedGame?.modes}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Player:{" "}
                <span className="text-[#fff]">{selectedGame?.player}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Available on:{" "}
                <span className="text-[#fff]">{selectedGame?.availableOn}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Play Offline:{" "}
                <span className="text-[#fff]">{selectedGame?.playOffline}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Supports Controllers:{" "}
                <span className="text-[#fff]">
                  {selectedGame?.supportsControllers}
                </span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Languages:{" "}
                <span className="text-[#fff]">
                  {Array.isArray(selectedGame?.languages)
                    ? selectedGame.languages.join(", ")
                    : selectedGame?.languages}
                </span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Developer:{" "}
                <span className="text-[#fff]">{selectedGame?.developer}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Release Year:{" "}
                <span className="text-[#fff]">{selectedGame?.releaseYear}</span>
              </p>
              <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                Maturity Rating:{" "}
                <span className="text-[#fff]">
                  {selectedGame?.maturityRating}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GameCards;
