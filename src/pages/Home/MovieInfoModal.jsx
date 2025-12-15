import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCircle } from "@fortawesome/free-solid-svg-icons";

const MovieInfoModal = ({ show, movie, onClose }) => {
  if (!show || !movie) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#17178b62] bg-opacity-100 z-100"
        onClick={onClose}
      ></div>

      <div className="bg-[#f31515ad] w-full h-screen absolute top-0 flex items-center z-100">
        <div className="w-max inset-0 absolute top-[20px] right-[18px] flex justify-center items-center z-150">
          <div className="modal-box relative w-[800px] bg-[#2132b4] h-screen rounded-[10px] p-[20px]">
            <button
              onClick={onClose}
              className="absolute top-4 right-[20px] cursor-pointer bg-[#262626] w-[40px] h-[40px] text-white text-2xl bg-black rounded-full z-[30] border-[#fff] border flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faTimes} className="text-[23px]" />
            </button>

            <div className="aboout-box pb-[15px] flex pt-[10px]">
              <div className="w-auto gap-[15px] flex flex-col">
                <img
                  src={movie.cover}
                  alt={movie.title}
                  className="w-[800px] h-[465px] rounded-lg object-cover"
                />

                <h2 className="text-white text-2xl">{movie.title}</h2>
                <div className="flex gap-2 items-center text-gray-400 text-sm">
                  <span>{movie.genre}</span>
                  <FontAwesomeIcon icon={faCircle} className="text-[6px]" />
                  <span>{movie.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Описание фильма */}
            <p className="text-white">{movie.description}</p>

            {/* Доп. информация */}
            <div className="flex gap-4 text-gray-300 text-sm mt-4">
              <p>Duration: {movie.duration}</p>
              <p>Rating: {movie.maturityRating}</p>
              <p>Language: {movie.language}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieInfoModal;
