import React, { useState, useEffect, useRef } from "react";
import "./Movies.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MovieCards from "../../components/Cards/MovieCards";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";
import LikeButton from "@/components/LikeButton/LikeButton";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Movies = ({ favorites, setFavorites }) => {
  const [open, setOpen] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
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
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const movie =
        data.results[Math.floor(Math.random() * data.results.length)];

      const [detailsRes, creditsRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`
        ),
      ]);

      const details = await detailsRes.json();
      const credits = await creditsRes.json();

      setRandomMovie({ ...details, cast: credits.cast });
    };

    fetchMovies();
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

  const isFavorite = favorites.some((m) => m.id === randomMovie?.id);

  const handleToggleFavorite = () => {
    if (!randomMovie) return;
    setFavorites((prev) =>
      prev.some((m) => m.id === randomMovie.id)
        ? prev.filter((m) => m.id !== randomMovie.id)
        : [...prev, randomMovie]
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
        <p className="pl-[80px] text-[35px] font-black pt-[20px]">Movies</p>

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
                      to={`/movies/genres/${genre.id}`}
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

      {/* RANDOM MOVIE */}
      <div className=" random-card relative z-0 flex w-full pl-[70px] pt-[70px]">
        {randomMovie && (
          <>
            <img
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="rounded shadow-lg w-[500px] h-[700px] object-cover"
            />

            <div className="about pt-[70px] pl-[50px] bg-black text-white w-[800px] h-[700px]">
              <div className="pb-[10px] text-[25px] font-bold">
                Watch {randomMovie.title} Now
              </div>

              <div className=" movie-inf text-[15px] w-[500px]">
                {limitOverview(randomMovie.overview)}
              </div>

              <div className=" inf flex gap-[10px] pt-[20px] text-[15px] text-[#aaa]">
                <span>{randomMovie.release_date}</span>
                <span className="text-white px-[5px]">HD</span>
                <span>{randomMovie.runtime} min</span>
                <span>{randomMovie.original_language}</span>
              </div>

              <div className="inf text-[15px] text-[#aaa]">
                Genres:{" "}
                <span className="text-white">
                  {randomMovie.genres?.map((g) => g.name).join(", ")}
                </span>
              </div>

              <div className="cast text-[15px] text-[#aaa] w-[400px]">
                Cast:{" "}
                <span className="text-white">
                  {randomMovie.cast
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
      <div className="mt-10 pl-[50px]">
        <MovieCards
          title="Trending This Week"
          category="trending/movie/week"
          favorites={favorites}
          onAdd={(m) =>
            setFavorites((prev) =>
              prev.some((x) => x.id === m.id) ? prev : [...prev, m]
            )
          }
          onRemove={(m) =>
            setFavorites((prev) => prev.filter((x) => x.id !== m.id))
          }
          onOpenModal={openModal}
        />

        <MovieCards
          title="Upcoming"
          category="upcoming"
          favorites={favorites}
          onAdd={(m) =>
            setFavorites((prev) =>
              prev.some((x) => x.id === m.id) ? prev : [...prev, m]
            )
          }
          onRemove={(m) =>
            setFavorites((prev) => prev.filter((x) => x.id !== m.id))
          }
          onOpenModal={openModal}
        />

        <MovieCards
          title="Popular"
          category="popular"
          favorites={favorites}
          onAdd={(m) =>
            setFavorites((prev) =>
              prev.some((x) => x.id === m.id) ? prev : [...prev, m]
            )
          }
          onRemove={(m) =>
            setFavorites((prev) => prev.filter((x) => x.id !== m.id))
          }
          onOpenModal={openModal}
        />

        <MovieCards
          title="Now Playing"
          category="now_playing"
          favorites={favorites}
          onAdd={(m) =>
            setFavorites((prev) =>
              prev.some((x) => x.id === m.id) ? prev : [...prev, m]
            )
          }
          onRemove={(m) =>
            setFavorites((prev) => prev.filter((x) => x.id !== m.id))
          }
          onOpenModal={openModal}
        />

        <MovieCards
          title="Trending Today"
          category="trending/movie/day"
          favorites={favorites}
          onAdd={(m) =>
            setFavorites((prev) =>
              prev.some((x) => x.id === m.id) ? prev : [...prev, m]
            )
          }
          onRemove={(m) =>
            setFavorites((prev) => prev.filter((x) => x.id !== m.id))
          }
          onOpenModal={openModal}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Movies;
