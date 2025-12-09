import React, { useEffect, useState, useCallback } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import HoverCard from "./HoverCard";


const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER;



const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoverCardDetail, setHoverCardDetail] = useState({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    let url;
    if (category?.startsWith("trending")) {
      url = `${BASE_URL}/${category}?api_key=${API_KEY}`;
    } else {
      url = `${BASE_URL}/movie/${
        category || "now_playing"
      }?api_key=${API_KEY}&language=en-US&page=1`;
    }

    fetch(url, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error("Error fetching list:", err));
  }, [category]);

  const fetchMovieDetail = useCallback(
    async (id) => {
      if (hoverCardDetail.id === id || isLoadingDetail) return;

      setIsLoadingDetail(true);

      try {
        const detailUrl = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(detailUrl, options);
        const data = await response.json();
        setHoverCardDetail(data);
      } catch {
        setHoverCardDetail({});
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [hoverCardDetail.id, isLoadingDetail]
  );

  const handleMouseEnter = (cardId) => {
    setHoveredCardId(cardId);
    fetchMovieDetail(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setHoverCardDetail({});
  };

  return (
    <div className="title-cards  pr-[50px] mt-[50px]">
      <h2 className="mb-[8px]">{title || "Popular on Netflix"}</h2>

      <div className="wrapper ">
        <div className="card-list flex gap-[8px]  ">
          {apiData.map((card) => (
            <div
              key={card.id}
              className="card-wrapper relative"
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={`/player/${card.id}`}
                className="card block min-w-[250px] transition-all duration-300 hover:scale-[1.05] relative z-10"
              >
                {card.backdrop_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                    className="card-img w-[250px] rounded-[5px] object-cover"
                    alt={card.original_title || card.name}
                  />
                )}

                <p className="absolute right-[10px] bottom-[10px] text-white bg-black bg-opacity-50 px-2 py-1 rounded text-xs pointer-events-none">
                  {card.original_title || card.name}
                </p>
              </Link>

              {hoveredCardId === card.id && hoverCardDetail.id === card.id && (
                <HoverCard data={hoverCardDetail} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleCards;
