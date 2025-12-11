import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Shows = ({ favorites, setFavorites }) => {
  const [open, setOpen] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  const [genres, setGenres] = useState([]); 
  const headerRef = useRef(null);

  const limitOverview = (text, maxSentences = 3) => {
    if (!text) return "";
    const sentences = text.split(/(?<=[.!?])\s+/);
    if (sentences.length <= maxSentences) {
      return text;
    }
    return sentences.slice(0, maxSentences).join(" ") + "...";
  };

  const sortedGenres = [...genres].sort((a, b) =>
    a.name.localeCompare(b.name, "en")
  );

  const handleAddFavorite = () => {
    if (!randomMovie) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === randomMovie.id);
      if (exists) return prev;
      return [...prev, randomMovie];
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const mapped = data.genres.map((g) => ({
        id: g.id,
        name: g.name,
        link: `/genres/${g.id}`, 
      }));
      setGenres(mapped);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await res.json();
      const movies = data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      const movie = movies[randomIndex];

      const detailsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
      );
      const details = await detailsRes.json();

      const releaseRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/release_dates?api_key=${API_KEY}`
      );
      const releaseData = await releaseRes.json();
      const usRating = releaseData.results.find((r) => r.iso_3166_1 === "US");
      const certification = usRating?.release_dates[0]?.certification || "";

      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`
      );
      const credits = await creditsRes.json();

      setRandomMovie({ ...details, certification, cast: credits.cast });
    };

    fetchMovies();
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

  return (
    <div>
      <Navbar />

      <div className="pt-[60px] w-full">
        <div
          ref={headerRef}
          className="flex fixed nav-dark pb-[10px] items-baseline gap-[40px] w-full bg-transparent transition-colors duration-300 z-50"
        >
          <p className="pl-[45px] text-[35px] font-black pt-[20px]">Shows</p>

          <div className="relative inline-block mt-4  ">
            <button
              onClick={() => setOpen(!open)}
              className="bg-[#000] border px-[10px] cursor-pointer text-white rounded"
            >
              Genres{" "}
              <FontAwesomeIcon icon={faCaretDown} className="text-white" />
            </button>

            {open && (
              <div className="absolute bg-[#000] text-[#fff] mt-2 w-[150px] pl-[10px]  z-10">
                <ul className="py-[4px]">
                  {sortedGenres.map((genre) => (
                    <li key={genre.id}>
                      <Link
                        to={genre.link}
                        className="block px-4 py-2 hover:bg-gray-100"
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

        <div className="flex w-full pl-[0px] h-auto text-[25px] font-bold top-[70px] z-10">
          {randomMovie ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
                alt={randomMovie.title}
                className="rounded shadow-lg w-[500px] h-[700px] object-cover mt-4"
              />

              <div className="about pt-[70px] pl-[50px] bg-[#000000] text-[#fff] w-[800px] h-[700px]">
                <div className="pb-[10px]">
                  Watch{" "}
                  <span className="text-[25px] font-[500]">
                    {randomMovie.title}
                  </span>{" "}
                  Now
                </div>
                <div className="text-[15px] w-[500px]">
                  {limitOverview(randomMovie?.overview)}
                </div>

                <div className="inf flex gap-[10px] pt-[20px] items-center">
                  <div className="text-[#aaa] text-[15px]">
                    {randomMovie.release_date}
                  </div>
                  <span className="text-[#fff] hd text-[15px] px-[5px]">
                    HD
                  </span>
                  <span className="text-[#aaa] text-[15px]">
                    {randomMovie.runtime} min
                  </span>
                  <span className="text-[#aaa] text-[16px]">
                    {randomMovie?.original_language}
                  </span>
                </div>

                <div className="text-[15px] text-[#aaa]">
                  Genres:
                  <span className="text-[#fff] pl-[5px]">
                    {randomMovie?.genres?.map((g) => g.name).join(", ")}
                  </span>
                </div>

                <div className="text-[15px] text-[#aaa] w-[400px] flex">
                  <p>Cast:</p>
                  <span className="text-[#fff] pl-[5px]">
                    {randomMovie?.cast
                      ?.slice(0, 5)
                      .map((actor) => actor.name)
                      .join(", ")}
                  </span>
                </div>

                <div className="like-btns pt-[20px] pb-[20px] flex gap-[10px]">
                  <button
                    onClick={handleAddFavorite}
                    className="btn border cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center"
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
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
            "Загрузка..."
          )}
        </div>
      </div>

      <div className="category-cards mt-10">
        <TitleCards title="Top Rated" category="top_rated" />
        <TitleCards title="Trending This Week" category="trending/movie/week" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Popular" category="popular" />
        <TitleCards title="Now Playing" category="now_playing" />
        <TitleCards title="Trending Today" category="trending/movie/day" />
      </div>

      <Footer />
    </div>
  );
};

export default Shows;
