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
  const [randomShow, setRandomShow] = useState(null);
  const [genres, setGenres] = useState([]);
  const headerRef = useRef(null);

  // ограничение описания
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

  const handleAddFavorite = () => {
    if (!randomShow) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === randomShow.id);
      if (exists) return prev;
      return [...prev, randomShow];
    });
  };

  // ✅ жанры для сериалов
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

  // ✅ случайный сериал
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

  return (
    <div>
      <Navbar />

      <div className="pt-[60px] w-full">
        <div
          ref={headerRef}
          className="flex fixed nav-dark pb-[10px] items-baseline gap-[40px] w-full bg-transparent transition-colors duration-300 z-50"
        >
          <p className="pl-[45px] text-[35px] font-black pt-[20px]">Shows</p>

          <div className="relative inline-block mt-4">
            <button
              onClick={() => setOpen(!open)}
              className="bg-[#000] border px-[10px] cursor-pointer text-white rounded"
            >
              Genres <FontAwesomeIcon icon={faCaretDown} className="text-white" />
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

        <div className="flex w-full pl-[0px] h-auto text-[25px] font-bold top-[70px] z-10">
          {randomShow ? (
            <>
              <img
                src={`https://image.tmdb.org/t/p/w500${randomShow.poster_path}`}
                alt={randomShow.name}
                className="rounded shadow-lg w-[500px] h-[700px] object-cover mt-4"
              />

              <div className="about pt-[70px] pl-[50px] bg-[#000] text-[#fff] w-[800px] h-[700px]">
                <div className="pb-[10px]">
                  Watch{" "}
                  <span className="text-[25px] font-[500]">{randomShow.name}</span>{" "}
                  Now
                </div>
                <div className="text-[15px] w-[500px]">
                  {limitOverview(randomShow?.overview)}
                </div>

                <div className="inf flex gap-[10px] pt-[20px] items-center">
                  <div className="text-[#aaa] text-[15px]">
                    {randomShow.first_air_date}
                  </div>
                  <span className="text-[#fff] hd text-[15px] px-[5px]">HD</span>
                  <span className="text-[#aaa] text-[16px]">
                    {randomShow?.original_language}
                  </span>
                </div>

                <div className="text-[15px] text-[#aaa]">
                  Genres:
                  <span className="text-[#fff] pl-[5px]">
                    {randomShow?.genres?.map((g) => g.name).join(", ")}
                  </span>
                </div>

                <div className="text-[15px] text-[#aaa] w-[400px] flex">
                  <p>Cast:</p>
                  <span className="text-[#fff] pl-[5px]">
                    {randomShow?.cast
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
                    <FontAwesomeIcon icon={faPlus} className="text-[20px] text-[#fff]" />
                  </button>

                  <button className="btn border cursor-pointer text-[#aaa] rounded-[50%] w-[40px] h-[40px] flex items-center justify-center">
                    <FontAwesomeIcon icon={faThumbsUp} className="text-[20px] text-[#fff]" />
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
        <TitleCards title="Top Rated" category="top_rated" type="tv" />
        <TitleCards title="Trending This Week" category="trending/tv/week" />
        <TitleCards title="Popular" category="popular" type="tv" />
        <TitleCards title="Trending Today" category="trending/tv/day" />
      </div>

      <Footer />
    </div>
  );
};

export default Shows;
