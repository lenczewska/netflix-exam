import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import logo_header from "../../assets/img/logo_header.png";
import game_banner from "../../assets/img/game_banner.svg";
import qr_code from "../../assets/img/qr_code.jpg";
import app_store from "../../assets/img/app_store.svg";
import google_play from "../../assets/img/google_play.svg";

function GameModal({ game, onClose }) {
  useEffect(() => {
    if (game) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [game]);
  if (!game) return null;
  return (
    <div
      className="fixed inset-0 bg-[#171414d9] bg-opacity-100 z-[100] flex justify-center items-center"
      style={{ backdropFilter: "blur(2px)" }}
      onClick={onClose}
    >
      <div
        className="relative max-w-[700px] w-[90vw] max-h-[90vh] bg-[#181818] rounded-[10px] p-[20px] overflow-y-auto shadow-lg"
        style={{ boxShadow: "0 0 40px 10px #000", zIndex: 200 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-[15px] right-[15px] text-white text-[22px] bg-[#000] rounded-full px-[5px] py-[3px] z-[201]"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="flex flex-col">
          <div className="about-box pb-[15px] pt-[10px]">
            <div className="w-auto  gap-[15px] flex items-center">
              <img
                src={game?.images?.cover}
                alt={game?.title}
                className="w-[110px] h-[100px]  rounded-[15px] object-cover"
              />
              <div>
                <img src={logo_header} alt="logo" className="w-[60px]" />
                <h2 className="text-[20px] text-white">{game?.title}</h2>
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
              <div className="download-box flex justify-between items-center w-full h-[170px] p-[20px] rounded-[10px] bg-[#222] mt-[20px]">
                <div className="left-box mt-[10px] flex justify-center items-center  gap-[40px] ml-[20px]">
                  <div className="qr-box">
                    <img
                      src={qr_code}
                      alt="qr-netflix"
                      className="w-[120px]  rounded-[4px]"
                    />
                  </div>
                  <div className="text-box flex flex-col gap-[3px] w-[350px]">
                    <h2 className="text-[#fff] font-[700] mt-[-10px] text-[19px]">
                      Scan to download on mobile
                    </h2>
                    <p className="text-[#fff] text-[14px]">
                      Included with your membership. No ads, extra fees or
                      in-app purchases.
                    </p>
                    <div className="a-img mt-[10px] flex gap-[10px]">
                      <a
                        href="https://apps.apple.com/us/app/netflix/id363590051"
                        target="_blank"
                      >
                        <img
                          src={app_store}
                          alt="app-store"
                          className="w-[117px]"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=com.netflix.mediaclient"
                        target="_blank"
                      >
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
            
          </div>
          <div className="inf-box mt-[40px]">
            <h2 className="text-[30px] font-[500] mb-[10px] text-white">
              About <span className="text-[#fff] ">{game?.title}</span>
            </h2>
            <span className="text-[#fff] w-[500px] text-[20px] ">{game?.description}</span>
            <p className="mb-[5px] text-[14px] mt-[10px] text-[#a3a3a3]">
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
    </div>
  );
}

export default GameModal;
