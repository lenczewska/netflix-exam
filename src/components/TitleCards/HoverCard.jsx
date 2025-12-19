import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faThumbsUp,
  faPlus,
  faCheck,
  faChevronDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./HoverCard.css";


const HoverCardT = ({
  data,
  onAdd,
  onRemove,
  onMouseEnter,
  onMouseLeave,
  handleMoreInfo,
  isFavorite,
  onOpenModal,
}) => {
  if (!data || Object.keys(data).length === 0) return null;

  const releaseYear = data.release_date
    ? new Date(data.release_date).getFullYear()
    : "N/A";

  return (
    <div
      className="hover-card  bg-[#222121] text-[#fff] w-[330px] h-[380px] p-[9px] duration-300 flex flex-col justify-between cursor-pointer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {data.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          className="rounded w-full h-[300px] rounded-t-[10px] object-contain "
          alt={data.title || data.name}
        />
      )}
      <h3 className="text-xl px-[10px]  font-bold mb-1 line-clamp-1">
        {data.title || data.name}
      </h3>
      <p className="text-sm px-[10px]  mb-2">
        {releaseYear} |{" "}
        {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
      </p>

      <div className=" flex border-[#aaa] justify-between text-center px-[10px]  bg-[#000] text-[#fff] py-2 rounded">
        <div className="flex hover:bg-[#130f0f11] gap-[6px]">
          <Link
            to={`/player/${data.id}`}
            className="rounded-full w-[40px] h-[40px] bg-white border-2 border-transparent flex justify-center items-center transition-all duration-200 group"
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-black text-[19px] group-hover:text-white transition-all duration-200"
            />
            <style>{`
              .group:hover {
                background: transparent !important;
                border-color: #fff !important;
              }
              .group:hover .fa-play {
                color: #fff !important;
              }
            `}</style>
          </Link>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isFavorite) {
                onRemove?.(data);
              } else {
                onAdd?.(data);
              }
            }}
            className={`btn hover:border-[#fff]  border-2 border-[#616161] bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center`}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faCheck : faPlus}
              className="text-[20px] text-[#fff]"
            />
          </button>

          <button className="btn hover:border-[#fff]  border-2 border-[#616161] bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="text-[20px] text-[#fff]"
            />
          </button>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof onOpenModal === 'function') onOpenModal(data);
            else if (handleMoreInfo) handleMoreInfo(data);
          }}
          className="btn hover:border-[#fff]  border-2 border-[#616161] ml-[120px] bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[20px] text-[#fff]"
          />
        </button>
      </div>

      <div className="inf flex gap-[10px]  border-b border-b-[#d62929] pb-[10px]  pt-[20px] px-[10px]  items-center">
        <span className="text-[#fff] hd text-[15px] px-[5px]">HD</span>
        <span className="text-[#aaa] text-[16px]">
          {data?.original_language}
        </span>
        <div className="text-[15px] text-[#aaa]">
          <span className="text-[#aaa] flex gap-[5px] items-center pl-[5px]">
            {data?.genres?.slice(0, 2).map((g, index, array) => (
              <React.Fragment key={g.id || index}>
                {g.name}
                {index < array.length - 1 && (
                  <FontAwesomeIcon
                    icon={faCircle}
                    className="mx-1 text-[6px] text-[#aaa] align-middle"
                  />
                )}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HoverCardT;
