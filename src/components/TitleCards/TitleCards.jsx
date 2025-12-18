import React, { useEffect, useState, useCallback, useRef } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";
import HoverCardT from "./HoverCardT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER;

const TitleCards = ({ title, category, onAdd, handleMoreInfo, original, language, alpha }) => {
  const [apiData, setApiData] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoverCardDetail, setHoverCardDetail] = useState({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cardListRef = useRef(null);

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

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setHoveredCardId(null);
      setHoverCardDetail({});
    }
  };

  let filtered = [...apiData];
  if (original === "original") {
    if (language && language !== "all") {
      filtered = filtered.filter(card => card.original_language === language);
    }
  } else if (original === "dubbing") {
    if (language && language !== "all") {
      filtered = filtered.filter(card => card.original_language !== language && card.spoken_languages?.some(l => l.iso_639_1 === language));
    } else {
      filtered = filtered.filter(card => card.original_language !== "en"); 
    }
  }
  if ((!original || original === "") && language && language !== "all") {
    filtered = filtered.filter(card => card.original_language === language);
  }
  if (alpha === "az") {
    filtered.sort((a, b) => (a.title || a.name || "").localeCompare(b.title || b.name || ""));
  } else if (alpha === "za") {
    filtered.sort((a, b) => (b.title || b.name || "").localeCompare(a.title || a.name || ""));
  }

  // Функции для сдвига
  const handleScrollRight = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };
  const handleScrollLeft = () => {
    if (cardListRef.current) {
      cardListRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

 
  useEffect(() => {
    const ref = cardListRef.current;
    if (!ref) return;
    const onScroll = () => {
      setScrolled(ref.scrollLeft > 125); 
    };
    ref.addEventListener("scroll", onScroll);
    onScroll();
    return () => ref.removeEventListener("scroll", onScroll);
  }, [cardListRef]);

  return (
    <div className="title-cards pr-[50px] mt-[40px] relative">
      <h2 className="mb-[8px]">{title || "Popular on Netflix"}</h2>
      <div className="wrapper">
        {scrolled && (
          <button
            className="scroll-btn left-[0px] absolute top-[220px] z-20 bg-[#000000c7] bg-opacity-60 text-white  w-[50px] h-[141px] flex items-center justify-center"
            style={{ transform: "translateY(-50%)" }}
            onClick={handleScrollLeft}
            aria-label="Scroll Left"
          >
            <FontAwesomeIcon icon={faChevronLeft} size="lg" />
          </button>
        )}
        <button
          className="scroll-btn right-[-0px] absolute top-[220px] z-20 bg-[#000000c7] bg-opacity-60 text-white  w-[50px] h-[141px] flex items-center justify-center"
          style={{ transform: "translateY(-50%)" }}
          onClick={handleScrollRight}
          aria-label="Scroll Right"
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
        <div
          className="card-list overflow-x-scroll flex gap-[8px] pb-4"
          ref={cardListRef}
        >
          {filtered.map((card) => (
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
