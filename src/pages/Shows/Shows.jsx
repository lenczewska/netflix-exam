import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/Cards/MovieCards";
import "./Shows.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";
import LikeButton from "@/components/LikeButton/LikeButton";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Shows = ({ favorites, setFavorites }) => {
  const [open, setOpen] = useState(false);
  const [randomShow, setRandomShow] = useState(null);
  const [genres, setGenres] = useState([]);
  const headerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const show =
        data.results[Math.floor(Math.random() * data.results.length)];

      const [detailsRes, creditsRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/tv/${show.id}?api_key=${API_KEY}&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=${API_KEY}&language=en-US`
        ),
      ]);

      const details = await detailsRes.json();
      const credits = await creditsRes.json();

      setRandomShow({ ...details, cast: credits.cast });
    };
    fetchShows();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        headerRef.current?.classList.remove("nav-dark");
      } else {
        headerRef.current?.classList.add("nav-dark");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const limitOverview = (text, maxSentences = 3) => {
    if (!text) return "";
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.length <= maxSentences
      ? text
      : sentences.slice(0, maxSentences).join(" ") + "...";
  };

  const sortedGenres = [...genres].sort((a, b) =>
    a.name.localeCompare(b.name, "en")
  );

  const isFavorite = favorites.some((f) => f.id === randomShow?.id);

  const handleToggleFavorite = () => {
    if (!randomShow) return;
    setFavorites((prev) =>
      prev.some((f) => f.id === randomShow.id)
        ? prev.filter((f) => f.id !== randomShow.id)
        : [...prev, randomShow]
    );
  };

  return (
    <div>
      <Navbar />

      <div
        ref={headerRef}
        className="
          fixed top-[60px] left-0 w-full flex items-baseline gap-[40px]
          pb-[10px] bg-transparent transition-colors duration-300
          z-[9999]
        "
      >
        <p className="pl-[70px] text-[35px] font-black pt-[20px]">Shows</p>

        <div className="relative inline-block mt-4">
          <button
            onClick={() => setOpen((v) => !v)}
            className="bg-black/80 border px-[10px] cursor-pointer text-white rounded"
          >
            Genres <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {open && (
            <div className="absolute left-0 mt-2 w-[180px] bg-black text-white z-[10000] rounded shadow-lg">
              <ul className="py-2 px-3 space-y-1 max-h-[300px] overflow-y-auto">
                {sortedGenres.map((genre) => (
                  <li key={genre.id}>
                    <Link
                      to={`/shows/genres/${genre.id}`}
                      className="block hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {genre.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* RANDOM SHOW */}
      <div className=" random-card relative z-0 flex w-full pl-[70px] pt-[70px]   ">
        {randomShow && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${randomShow.poster_path}`}
              alt={randomShow.name}
              className="rounded shadow-lg w-[500px] h-[700px] object-cover"
            />

            <div className="about pt-[70px] pl-[50px] bg-black text-white w-[800px] h-[700px]">
              <div className=" movie-inf pb-[10px] text-[25px] font-bold">
                Watch {randomShow.name} Now
              </div>

              <div className=" movie-inf text-[15px] w-[500px]">
                {limitOverview(randomShow.overview)}
              </div>

              <div className=" inf flex gap-[10px] pt-[20px] text-[15px] text-[#aaa]">
                <span>{randomShow.first_air_date}</span>
                <span className=" px-[5px] text-white">HD</span>
                <span  >{randomShow.original_language}</span>
              </div>

              <div className=" inf text-[15px] text-[#aaa]">
                Genres:{" "}
                <span className="text-white">
                  {randomShow.genres?.map((g) => g.name).join(", ")}
                </span>
              </div>

              <div className=" cast text-[15px] text-[#aaa] w-[400px]">
                Cast:{" "}
                <span className="text-white">
                  {randomShow.cast
                    ?.slice(0, 5)
                    .map((a) => a.name)
                    .join(", ")}
                </span>
              </div>

              <div className=" like-btns pt-[20px] flex gap-[10px]">
                <button
                  onClick={handleToggleFavorite}
                  className="border rounded-full w-[40px] h-[40px] flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={isFavorite ? faCheck : faPlus}
                    className="text-white"
                  />
                </button>

                <LikeButton />
              </div>
            </div>
          </>
        )}
      </div>

      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
        favorites={favorites}
        setFavorites={setFavorites}
      />

      {/* CATEGORIES */}
      <div className="mt-10">
        <TitleCards
          title="Top Rated"
          category="top_rated"
          type="tv"
          favorites={favorites}
          onAdd={(tv) =>
            setFavorites((prev) =>
              prev.some((m) => m.id === tv.id) ? prev : [...prev, tv]
            )
          }
          onRemove={(tv) =>
            setFavorites((prev) => prev.filter((m) => m.id !== tv.id))
          }
          onOpenModal={openModal}
        />

        <TitleCards
          title="Popular"
          category="popular"
          type="tv"
          favorites={favorites}
          onAdd={(tv) =>
            setFavorites((prev) =>
              prev.some((m) => m.id === tv.id) ? prev : [...prev, tv]
            )
          }
          onRemove={(tv) =>
            setFavorites((prev) => prev.filter((m) => m.id !== tv.id))
          }
          onOpenModal={openModal}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Shows;
