import React, { useEffect, useState, useCallback } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import HoverCardT from "./HoverCardT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER;

const TitleCards = ({ title, category, onAdd, handleMoreInfo }) => {
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


  // Показываем HoverCardT только если мышь над карточкой или над HoverCardT
  const handleMouseEnter = (cardId) => {
    setHoveredCardId(cardId);
    fetchMovieDetail(cardId);
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHoveredCardId(null);
      setHoverCardDetail({});
    }
  };

  return (
    <div className="title-cards pr-[50px] mt-[50px]">
      <h2 className="mb-[8px]">{title || "Popular on Netflix"}</h2>

      <div className="wrapper  ">
        <div className="card-list overflow-x-scroll flex gap-[8px] pb-4">
          {apiData.map((card) => (
            <div
              key={card.id}
              className="card-wrapper  relative"
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
                <HoverCardT
                  data={hoverCardDetail}
                  onAdd={onAdd}
                  onMouseEnter={() => handleMouseEnter(card.id)}
                  onMouseLeave={handleMouseLeave}
                  handleMoreInfo={(movie) => {
                    // Преобразуем данные TMDB в формат MovieInfoModal
                    // Оставляем только первое предложение в описании
                    let description = movie.overview || '';
                    if (description.includes('.')) {
                      description = description.split('.').shift().trim() + '.';
                    }
                    const mapped = {
                      id: movie.id,
                      title: movie.title || movie.name,
                      description,
                      genre: movie.genres?.map((g) => g.name).join(', '),
                      releaseYear: movie.release_date ? new Date(movie.release_date).getFullYear() : '',
                      cover: movie.backdrop_path ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}` : '',
                      duration: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '',
                      maturityRating: movie.adult ? '18+' : 'PG-13',
                      language: movie.original_language,
                      cast: movie.credits?.cast?.slice(0, 5).map((a) => ({ name: a.name })) || [],
                    };
                    handleMoreInfo && handleMoreInfo(mapped);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TitleCards;
