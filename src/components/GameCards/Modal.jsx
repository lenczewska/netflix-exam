import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import qr_code from "../../assets/img/qr_code.jpg";
import app_store from "../../assets/img/app_store.svg";
import google_play from "../../assets/img/google_play.svg";
import game_banner from "../../assets/img/game_banner.svg";
import logo_header from "../../assets/img/logo_header.png";

function Modal({ game, onClose }) {
  if (!game) return null;

  return (
    <>
      <div className="modal-box relative max-w-[1200px] h-auto mr-[150px] ml-[100px] flex justify-center items-center bg-[#181818] z-100 rounded-[10px]">
        <button
          onClick={onClose}
          className="absolute bg-[#000] rounded-[100%] top-[15px] right-[15px]  text-[30px] font-bold hover:text-red-500 w-[30px] h-[30px] flex items-center justify-center "
        >
          <span className="  text-[white]" > ×</span>
        </button>
        <div className="flex flex-col">
          <div className="about-box pb-[15px] pt-[10px]">
            <div className="w-auto gap-[15px] flex items-center  ">
              <img
                src={game?.images?.cover}
                alt={game?.title}
                className="w-[110px] h-[100px] rounded-[15px] object-center"
              />

              <div>
                <img src={logo_header} alt="logo" className="w-[60px]" />
                <h2 className="text-[20px]">{game?.title}</h2>
                <div className="flex gap-[10px] items-center">
                  <p className="text-[#aaa] text-[14px]">Mobile Game</p>
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="text-[6px] text-[#3d3c3c]"
                  />
                  <p className="text-[#aaa] text-[14px]">{game?.category}</p>
                  <p className="border text-[14px] px-[4px] text-[#aaa]">
                    {game?.maturityRating}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-auto flex  items-center gap-[50px] pt-[20px] ">
              <span className="text-[#fff] w-[500px] ">
                {game?.description}
              </span>
              <div className="flex flex-col">
                <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                  Modes: <span className="text-[#fff]">{game?.modes}</span>
                </p>

                <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
                  Play Offline:{" "}
                  <span className="text-[#fff]">{game?.playOffline}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Download box */}
          <div className="download-box flex justify-between items-center w-[800px] h-[150px] p-[20px] rounded-[10px]">
            <div className="left-box mt-[10px] flex gap-[10px] ml-[20px]">
              <div className="qr-box">
                <img
                  src={qr_code}
                  alt="qr-netflix"
                  className="w-[120px] rounded-[4px]"
                />
              </div>

              <div className="text-box flex flex-col gap-[3px] w-[350px]">
                <h2 className="text-[#fff] font-[700] text-[19px]">
                  Scan to download on mobile
                </h2>
                <p className="text-[#fff] text-[14px]">
                  Included with your membership. No ads, extra fees or in-app
                  purchases.
                </p>

                <div className="a-img flex gap-[10px]">
                  <a href="">
                    <img
                      src={app_store}
                      alt="app-store"
                      className="w-[117px]"
                    />
                  </a>
                  <a href="">
                    <img
                      src={google_play}
                      alt="google-play"
                      className="w-[130px]"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="right-box">
              <img src={game_banner} alt="game_banner" />
            </div>
          </div>

          {/* Info box */}
          <div className="inf-box mt-[40px]">
            <h2 className="text-[25px] font-[500] mb-[10px]">
              About <span className="text-[#fff]">{game?.title}</span>
            </h2>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Category: <span className="text-[#fff]">{game?.category}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Modes: <span className="text-[#fff]">{game?.modes}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Player: <span className="text-[#fff]">{game?.player}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Available on:{" "}
              <span className="text-[#fff]">{game?.availableOn}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Play Offline:{" "}
              <span className="text-[#fff]">{game?.playOffline}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Supports Controllers:{" "}
              <span className="text-[#fff]">{game?.supportsControllers}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Languages:{" "}
              <span className="text-[#fff]">
                {Array.isArray(game?.languages)
                  ? game.languages.join(", ")
                  : game?.languages}
              </span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Developer: <span className="text-[#fff]">{game?.developer}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Release Year:{" "}
              <span className="text-[#fff]">{game?.releaseYear}</span>
            </p>
            <p className="mb-[5px] text-[14px] text-[#a3a3a3]">
              Maturity Rating:{" "}
              <span className="text-[#fff]">{game?.maturityRating}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
