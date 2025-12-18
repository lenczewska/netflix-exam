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

const HoverCardO = ({ data, onAdd, onMouseEnter, onMouseLeave, handleMoreInfo, onOpenModal, isFavorite }) => {
  if (!data || Object.keys(data).length === 0) return null;
  const releaseYear = data.release_date ? new Date(data.release_date).getFullYear() : "N/A";
  return (
    <div className="hover-card-original absolute z-9990 bg-[#111] text-[#fff] w-[330px] h-[380px] p-[9px] top-[500px] -translate-x-1/2 shadow-2xl transition-all duration-300">
      {data.backdrop_path && (
        <img src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`} className="rounded mb-2 hover-card-original-img" alt={data.title || data.name} />
      )}
      <h3 className="text-xl font-bold mb-1 line-clamp-1 hover-card-original-title">{data.title || data.name}</h3>
      <p className="text-sm mb-2 hover-card-original-desc">{releaseYear} | {data.vote_average ? data.vote_average.toFixed(1) : "N/A"}</p>
      <div className="mt-3 flex justify-between text-center bg-blue-600 text-[#fff] py-2 rounded">
        <div className="flex gap-[6px]">
          <Link to={`/player/${data.id}`} className="rounded-[50%] w-[40px] h-[40px] bg-[#fff] flex justify-center items-center">
            <FontAwesomeIcon icon={faPlay} className="text-[#000] text-[25px]" />
          </Link>
          <button onClick={() => { if (!isFavorite) onAdd(data); }} className="btn border-[#616161] border-2 bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center" disabled={isFavorite}>
            <FontAwesomeIcon icon={isFavorite ? faCheck : faPlus} className="text-[20px] text-[#fff]" />
          </button>
          <button className="btn border-[#616161] border-2 bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
            <FontAwesomeIcon icon={faThumbsUp} className="text-[20px] text-[#fff]" />
          </button>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof onOpenModal === 'function') onOpenModal(data);
            else if (handleMoreInfo) handleMoreInfo(data);
          }}
          className="btn hover:border-[#fff] border-2 border-[#616161] ml-[120px] bg-[#141414] cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-[20px] text-[#fff]" />
        </button>
      </div>
      <div className="inf flex gap-[10px] pt-[20px] items-center">
        <span className="text-[#fff] hd text-[15px] px-[5px]">HD</span>
        <span className="text-[#aaa] text-[16px]">{data?.original_language}</span>
        <div className="text-[15px] text-[#aaa]">
          <span className="text-[#aaa] flex gap-[5px] items-center pl-[5px]">
            {data?.genres?.slice(0, 3).map((g, index, array) => (
              <React.Fragment key={g.id || index}>
                {g.name}
                {index < array.length - 1 && (
                  <FontAwesomeIcon icon={faCircle} className="mx-1 text-[6px] text-[#aaa] align-middle" />
                )}
              </React.Fragment>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HoverCardO;
