import { React, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";
import logo_header from "../../assets/img/logo_header.png";
import { Link } from "react-router-dom";
import play_icon from "../../assets/img/play_icon.png";
import { faThumbsUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./MovieInfoModal.css";

const MovieInfoModal = ({ show, movie, onClose }) => {
  if (!show || !movie) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  return (
    <>
      <div
        className="fixed inset-0 bg-[#41414262]  bg-opacity-100"
        style={{ zIndex: 9999 }}
        onClick={onClose}
      ></div>

      <div className="bg-[#181818ad] w-screen h-screen fixed top-0 left-0 flex items-center justify-center p-4" style={{ zIndex: 10000 }}>
        <div className="modal-scroll flex justify-center items-center max-h-[90vh] overflow-y-auto overflow-x-hidden" style={{ zIndex: 10001 }}>
          <div className="modal-box relative w-[800px] bg-[#181818] rounded-[10px] ">
            <button
              onClick={onClose}
              className="absolute top-[16px] right-[20px] cursor-pointer bg-[#262626] w-[40px] h-[40px] text-white text-2xl  rounded-full z-30 border-[#fff] border flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-[23px]" />
            </button>

            <div className="aboout-box pb-[15px] flex ">
              <div className="w-auto relative gap-[15px] flex flex-col">
                <img
                  src={movie.cover}
                  alt={movie.title}
                  className="w-[800px] h-[450px] object-cover"
                />

                <div className="play-box flex flex-col gap-[20px] ">
                  <img
                    src={logo_header}
                    alt="logo"
                    className="w-[125px] absolute bottom-[220px] left-[45px] "
                  />

                  <h2 className="text-white text-[20px] font-[700]  absolute bottom-[170px] left-[45px] ">
                    {movie.title}
                  </h2>

                  <div className=" flex gap-[5px] absolute bottom-[110px] left-[45px]  ">
                    <Link to="/player">
                      <button className="btn-play pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#fff] text-[#000] cursor-pointer rounded-[5px] sm:text-[12px] ">
                        <img
                          src={play_icon}
                          className="w-[25px] sm:w-[18px]"
                          alt=""
                        />
                        Play
                      </button>
                    </Link>
                    <button
                      onClick={() => onAdd(data)}
                      className="btn border-[#616161] border-2 bg-[#1414144c] hover:bg-[#1414141d] hover:border-[#fff] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-[20px] text-[#fff]"
                      />
                    </button>

                    <button className="btn  hover:border-[#fff] border-[#616161] border-2 bg-[#14141492] hover:bg-[#1414141d] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="text-[20px] text-[#fff]"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute  bg-[#0000007b] backdrop-blur-md bottom-[0px] top-[450px] pt-[30px] h-[300px] w-[800px] ">
              <div className="left flex  gap-[10px] pl-[45px] items-center text-[#aaa] ">
                <span>{movie.releaseYear}</span>
                <span className="border border-[#aaa] text-[13px] pl-[5px] pr-[5px]  ">
                  HD
                </span>
                <div className="svg-icons flex items-center gap-[10px] ">
                  <svg
                    viewBox="0 0 24 24"
                    width="34"
                    height="34"
                    data-icon="AudioDescriptionMedium"
                    data-icon-id=":r5o:"
                    aria-hidden="true"
                    class="default-ltr-iqcdef-cache-18tpq4v"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    role="img"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M21.978 7.52h.284A7.24 7.24 0 0 1 24 12.208a7.23 7.23 0 0 1-1.378 4.237h-1.056a6.6 6.6 0 0 0 1.555-4.237 6.64 6.64 0 0 0-1.96-4.688zM6.914 16.48h1.96V7.527H6.425L0 16.48h2.877l.755-1.184h3.282zm-2.051-3.05h2.063v-3.206zm7.439-3.807a2.38 2.38 0 0 1 2.382 2.382 2.383 2.383 0 0 1-2.382 2.385h-.623V9.623zm.242 6.851a4.48 4.48 0 0 0 4.477-4.47 4.46 4.46 0 0 0-4.456-4.476H9.799v8.95h2.745zM20.01 7.52h-1.1a6.64 6.64 0 0 1 1.96 4.688 6.6 6.6 0 0 1-1.555 4.237h1.049a7.2 7.2 0 0 0 1.385-4.237c0-1.728-.63-3.39-1.738-4.688m-2.536 0h.284a7.23 7.23 0 0 1 1.732 4.688 7.2 7.2 0 0 1-1.378 4.237h-1.05a6.62 6.62 0 0 0 1.548-4.237c0-1.759-.71-3.452-1.953-4.688z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    viewBox="0 0 16 16"
                    width="16"
                    height="16"
                    data-icon="SubtitlesSmall"
                    data-icon-id=":r5p:"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    role="img"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M0 1.75C0 1.34.34 1 .75 1h14.5c.41 0 .75.34.75.75v10.5c0 .41-.34.75-.75.75h-2.5v2a.75.75 0 0 1-1.11.66L6.8 13H.75a.75.75 0 0 1-.75-.75zm1.5.75v9h5.7l.16.1 3.89 2.13V11.5h3.25v-9zm4.5 4H3V5h3zm7 1h-3V9h3zM3 9V7.5h6V9zm10-4H7v1.5h6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="flex gap-[20px] justify-between mt-[15px] ">
                <div className="m-name flex-1  ">
                  <span className="text-[20px] font-[700] pl-[45px] ">
                    Watch {movie.title} Now
                  </span>
                  <p className="text-[#fff] pl-[45px] pt-[20px] text-[15px] ">
                    {movie.description}
                  </p>
                </div>

                <div className="flex-1 pr-[45px]">
                  <div className="right text-[#aaa] mb-4">
                    Genres:{" "}
                    <span className="text-[#fff]">
                      {movie.genre?.replace(/\//g, ", ")}
                    </span>
                  </div>
                  <div className="text-[#aaa]">
                    Cast:{" "}
                    <span className="text-[#fff] text-[14px] ">
                      {movie.cast
                        ?.slice(0, 5)
                        .map((actor) => actor.name)
                        .join(", ") || "N/A"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 text-[#aaa] text-sm">
                    <p>
                      Duration:{" "}
                      <span className="text-[#fff]">{movie.duration}</span>
                    </p>
                    <p>
                      Rating:{" "}
                      <span className="text-[#fff]">
                        {movie.maturityRating}
                      </span>
                    </p>
                    <p>
                      Language:{" "}
                      <span className="text-[#fff]">{movie.language}</span>
                    </p>
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
