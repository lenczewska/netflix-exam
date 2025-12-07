import React, { useState, useEffect, useRef } from "react";
import "./Movies.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
  const [open, setOpen] = useState(false);
  const [randomMovie, setRandomMovie] = useState(null);
  const headerRef = useRef(null); // ref для блока Movies + селект

  const genres = [
    { name: "Action", link: "/genres/comedy" },
    { name: "Anime", link: "/genres/drama" },
    { name: "British", link: "/genres/action" },
    { name: "Comedies", link: "/genres/sci-fi" },
  ];

  const sortedGenres = [...genres].sort((a, b) =>
    a.name.localeCompare(b.name, "en")
  );

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=5a2adbd4ccd50daf3380b9ff63d55291&language=en-US&page=1`
      );
      const data = await res.json();
      const movies = data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    };

    fetchMovies();
  }, []);

  // эффект для затемнения при скролле
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

      {/* Заголовок + селект */}
      <div className="pt-[60px] w-screen ">
        <div
          ref={headerRef}
          className="flex fixed nav-dark pb-[10px] items-baseline gap-[40px] w-full bg-transparent transition-colors duration-300 z-50"
        >
          <p className="pl-[45px] text-[35px] font-black pt-[20px]">Movies</p>
 
          <div className="relative inline-block mt-4">
            <button
              onClick={() => setOpen(!open)}
              className=" bg-[#000] border px-[10px] text-white rounded"
            >
              Genres{" "}
              <FontAwesomeIcon icon={faCaretDown} className="text-white" />
            </button>

            {open && (
              <div className="absolute bg-[#000] text-[#fff] mt-2 w-48 shadow-lg rounded z-10">
                <ul className="py-2">
                  {sortedGenres.map((genre, index) => (
                    <li key={index}>
                      <a
                        href={genre.link}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {genre.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Рандомный фильм */}
        <div className="flex  pl-[40px] h-auto text-[25px] font-bold top-[70px] z-10">
          {randomMovie ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="rounded shadow-lg w-[650px] h-[600px] object-center mt-4"
            />
          ) : (
            "Загрузка..."
          )}

          <div className="movie-inf bg-[#000] text-[#fff]  ">


          </div>
        </div>
      </div>

      {/* Карточки категорий */}
      <div className="category-cards mt-10">
        <TitleCards title="Today's Top Pick for You" category="top_rated" />
        <TitleCards title="Action Movies" category="popular" />
        <TitleCards title="" category="upcoming" />
        <TitleCards title="We Think You'll Love These" category="now_playing" />
      </div>

      <Footer />
    </div>
  );
};

export default Movies;
