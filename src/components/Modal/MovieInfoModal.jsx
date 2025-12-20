import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faThumbsUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import logo_header from "../../assets/img/logo_header.png";
import play_icon from "../../assets/img/play_icon.png";
import "./MovieInfoModal.css";

const MovieInfoModal = ({ show, movie, onClose, favorites, setFavorites, onLike }) => {
  if (!show || !movie) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const isFavorite = favorites?.some(m => m.id === movie.id);

  const handleToggleFavorite = () => {
    if (!setFavorites) return;
    if (isFavorite) {
      setFavorites(prev => prev.filter(m => m.id !== movie.id));
    } else {
      setFavorites(prev => [...prev, movie]);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#41414262] bg-opacity-100"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      ></div>

      <div
        className="bg-[#181818ad] w-screen h-screen fixed top-0 left-0 flex items-center justify-center p-4"
        style={{ zIndex: 10000 }}
      >
        <div className="modal-scroll flex justify-center items-center max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <div className="modal-box relative w-[800px] bg-[#181818] rounded-[10px]">
            
            <button
              onClick={onClose}
              className="absolute top-[16px] right-[20px] cursor-pointer bg-[#262626] w-[40px] h-[40px] text-white text-2xl rounded-full z-30 border-[#fff] border flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-[23px]" />
            </button>

            <div className="aboout-box pb-[15px] flex">
              <div className="w-auto relative gap-[15px] flex flex-col">
                <img
                  src={movie.cover}
                  alt={movie.title}
                  className="w-[800px] h-[450px] object-cover"
                />

                <div className="play-box flex flex-col gap-[20px]">
                  <img
                    src={logo_header}
                    alt="logo"
                    className="w-[125px] absolute bottom-[220px] left-[45px]"
                  />
                  <h2 className="text-white text-[20px] font-[700] absolute bottom-[170px] left-[45px]">
                    {movie.title}
                  </h2>

                  <div className="flex gap-[5px] absolute bottom-[110px] left-[45px]">
                    <Link to={`/player/${movie.id}`}>
                      <button className="btn-play pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#fff] text-[#000] cursor-pointer rounded-[5px] sm:text-[12px]">
                        <img src={play_icon} className="w-[25px] sm:w-[18px]" alt="" />
                        Play
                      </button>
                    </Link>

                    <button
                      onClick={handleToggleFavorite}
                      className="btn border-[#616161] border-2 bg-[#1414144c] hover:bg-[#1414141d] hover:border-[#fff] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
                    >
                      <FontAwesomeIcon
                        icon={isFavorite ? faCheck : faPlus}
                        className="text-[20px] text-[#fff]"
                      />
                    </button>

                    <button
                      onClick={() => onLike?.(movie)}
                      className="btn hover:border-[#fff] border-[#616161] border-2 bg-[#14141492] hover:bg-[#1414141d] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
                    >
                      <FontAwesomeIcon icon={faThumbsUp} className="text-[20px] text-[#fff]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="inf-box absolute bg-[#0000007b] backdrop-blur-md bottom-[0px] top-[450px] pt-[30px] h-[300px] w-[800px]">
              <div className="left flex gap-[10px] pl-[45px] items-center text-[#aaa]">
                <span>{movie.releaseYear}</span>
                <span className="border border-[#aaa] text-[13px] pl-[5px] pr-[5px]">HD</span>
              </div>

              <div className="movie-inf flex gap-[20px] justify-between mt-[15px]">
                <div className="m-name flex-1">
                  <span className="text-[18px] font-[700] pl-[45px]">
                    Watch {movie.title} Now
                  </span>
                  <p className="text-[#fff] pl-[45px] pt-[20px] text-[15px]">{movie.description}</p>
                </div>

                <div className="flex-1 pr-[45px]">
                  <div className="genres text-[#aaa] mb-4">
                    Genres: <span className="text-[#fff]">{movie.genre?.replace(/\//g, ", ")}</span>
                  </div>
                  <div className="cast text-[#aaa]">
                    Cast: <span className="text-[#fff] text-[14px]">{movie.cast?.slice(0, 5).map(a => a.name).join(", ") || "N/A"}</span>
                  </div>

                  <div className="lang-box flex flex-col gap-4 text-[#aaa] text-sm">
                    <p>Duration: <span className="text-[#fff]">{movie.duration}</span></p>
                    <p>Rating: <span className="text-[#fff]">{movie.maturityRating}</span></p>
                    <p>Language: <span className="text-[#fff]">{movie.language}</span></p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfoModal;
