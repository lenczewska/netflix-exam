import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import "./Shows.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";

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
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

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

  const handleToggleFavorite = () => {
    if (!randomShow) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === randomShow.id);
      if (exists) {
        return prev.filter((item) => item.id !== randomShow.id);
      } else {
        return [...prev, randomShow];
      }
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const mapped = data.genres.map((g) => ({
        id: g.id,
        name: g.name,
        link: `/shows/genres/${g.id}`,
      }));
      setGenres(mapped);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchShows = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      const shows = data.results;
      const randomIndex = Math.floor(Math.random() * shows.length);
      const show = shows[randomIndex];

      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}?api_key=${API_KEY}&language=en-US`
      );
      const details = await detailsRes.json();

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/tv/${show.id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const credits = await creditsRes.json();

      setRandomShow({ ...details, cast: credits.cast });
    };
    fetchShows();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        headerRef.current?.classList.add("nav-dark");
      } else {
        headerRef.current?.classList.remove("nav-dark");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isFavorite = favorites.some((item) => item.id === randomShow?.id);

  return (
    <div>
      <Navbar />

      <div className="pt-[60px] w-full">
        <div
          ref={headerRef}
          className="flex fixed nav-dark pb-[10px] items-baseline gap-[40px] w-full bg-transparent transition-colors duration-300 z-50"
        >
          <p className="pl-[45px] text-[35px] font-black pt-[20px]">Shows</p>

          <div className="relative inline-block z-10 mt-4">
            <button
              onClick={() => setOpen(!open)}
              className="bg-[#000] border px-[10px] cursor-pointer text-white rounded"
            >
              Genres{" "}
              <FontAwesomeIcon icon={faCaretDown} className="text-white" />
            </button>

            {open && (
              <div className="absolute bg-[#000] text-[#fff] mt-2 w-[150px] pl-[10px] z-10">
                <ul className="py-[4px]">
                  {sortedGenres.map((genre) => (
                    <li key={genre.id}>
                      <Link to={`/shows/genres/${genre.id}`}>{genre.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className=" random-card flex w-full pl-[0px] h-auto text-[25px] font-bold top-[70px] z-10">
          {randomShow ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${randomShow.poster_path}`}
                alt={randomShow.name}
                className="rounded shadow-lg w-[500px] h-[700px] object-cover "
              />

              <div className="about pt-[70px] pl-[50px] bg-[#000] text-[#fff] w-[800px] h-[700px]">
                <div className="pb-[10px]">
                  Watch{" "}
                  <span className="text-[25px] font-[500]">
                    {randomShow.name}
                  </span>{" "}
                  Now
                </div>
                <div className="movie-inf text-[15px] w-[500px]">
                  {limitOverview(randomShow?.overview)}
                </div>

                <div className="inf flex gap-[10px] pt-[20px] items-center">
                  <div className="text-[#aaa] text-[15px]">
                    {randomShow.first_air_date}
                  </div>
                  <span className="text-[#fff] hd text-[15px] px-[5px]">
                    HD
                  </span>
                  <span className="text-[#aaa] text-[16px]">
                    {randomShow?.original_language}
                  </span>
                </div>

                <div className=" text-[15px] text-[#aaa]">
                  Genres:
                  <span className="text-[#fff] pl-[5px]">
                    {randomShow?.genres?.map((g) => g.name).join(", ")}
                  </span>
                </div>

                <div className=" cast text-[15px] text-[#aaa] w-[400px] flex">
                  <p>Cast:</p>
                  <span className="text-[#fff]">
                    {randomShow?.cast
                      ?.slice(0, 5)
                      .map((actor) => actor.name)
                      .join(", ")}
                  </span>
                </div>

                <div className="like-btns pt-[20px] pb-[20px] flex gap-[10px]">
                  <button
                    onClick={handleToggleFavorite}
                    className="btn border cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={isFavorite ? faCheck : faPlus}
                      className="text-[20px] text-[#fff]"
                    />
                  </button>

                  <button className="btn border cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faThumbsUp}
                      className="text-[20px] text-[#fff]"
                    />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="skeleton">
              <div className="skeleton-poster"></div>
              <div className="skeleton-info"></div>
            </div>
          )}
        </div>
      </div>

      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />

      <div className="category-cards mt-10">
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
          onOpenModal={openModal} // ✅ модалка открывается
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
          onOpenModal={openModal} // ✅ модалка открывается
        />
        <TitleCards
          title="Upcoming"
          category="upcoming"
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
