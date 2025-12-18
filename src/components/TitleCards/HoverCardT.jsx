import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faThumbsUp,
  faPlus,
  faChevronDown,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./HoverCard.css";

const HoverCardT = ({ data, onAdd, onMouseEnter, onMouseLeave }) => {
  if (!data || Object.keys(data).length === 0) return null;

  const releaseYear = data.release_date
    ? new Date(data.release_date).getFullYear()
    : "N/A";

  return (
    <div
      className="
      hover-card 
      bg-[#000] 
      text-[#fff] 
      w-[330px] 
      h-[380px] 
      p-[9px]
      duration-300
      flex
      flex-col
      justify-between
      cursor-pointer
    "
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
      <h3 className="text-xl  font-bold mb-1 line-clamp-1">
        {data.title || data.name}
      </h3>
      <p className="text-sm mb-2">
        {releaseYear} |{" "}
        {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}
      </p>

      <div className=" flex justify-between text-center bg-[#000] text-[#fff] py-2 rounded">
        <div className="flex gap-[6px]">
          {/* Play ведёт на плеер */}
          <Link
            to={`/player/${data.id}`}
            className="rounded-[50%] w-[40px] h-[40px] bg-[#fff] flex justify-center items-center"
          >
            <FontAwesomeIcon
              icon={faPlay}
              className="text-[#000] text-[25px]"
            />
          </Link>

          {/* Добавить в My List */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("HoverCard + clicked:", data); // Проверка что фильм приходит

              onAdd?.(data); // правильно передаём объект фильма из props
            }}
            className="btn border-[#616161] border-2 bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="text-[20px] text-[#fff]"
            />
          </button>

          {/* Лайк */}
          <button className="btn border-[#616161] border-2 bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className="text-[20px] text-[#fff]"
            />
          </button>
        </div>

        {/* Chevron Down — тоже добавляет в список */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAdd?.(data);
          }}
          className="btn border-[#616161] border-2 bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
        >
          <FontAwesomeIcon
            icon={faChevronDown}
            className="text-[20px] text-[#fff]"
          />
        </button>
      </div>

      <div className="inf flex gap-[10px] pt-[20px] items-center">
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
