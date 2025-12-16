import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import MovieInfoModal from "./MovieInfoModal";
import hero_banner2 from "../../assets/img/hero_banner2.jpg";
import hero_title from "../../assets/img/hero_title.png";
import play_icon from "../../assets/img/play_icon.png";
import info_icon from "../../assets/img/info_icon.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Управляем скроллом при изменении состояния модалки
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const movies = [
    {
      id: 1,
      title: "The Ottoman Quest",
      description:
        "Discovering his ties to an ancient order, he embarks on a treacherous quest in Istanbul.",
      genre: "Action/Adventure",
      releaseYear: 2025,
      cover: hero_banner2,
      duration: "2h 15m",
      maturityRating: "PG-13",
      language: "English",
    },
    {
      id: 2,
      title: "Space Odyssey",
      description: "A journey through the stars and beyond.",
      genre: "Sci-Fi",
      releaseYear: 2023,
      cover: hero_banner2,
      duration: "2h 40m",
      maturityRating: "PG-13",
      language: "English",
    },
  ];

  return (
    <div className="home w-full min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-auto">
        <img
          src={hero_banner2}
          alt=""
          className="hero-banner-img w-full object-cover sm:h-[260px] md:h-[380px] h-[500px]"
        />

        <div className="hero-content absolute top-[20%] left-[6%] sm:top-[18%] sm:left-[4%] md:top-[22%] z-20 max-w-[600px]">
          <img
            src={hero_title}
            className="w-[90%] max-w-[420px] sm:max-w-[260px] md:max-w-[330px]"
            alt=""
          />

          <p className="mt-[30px] mb-5 text-[17px] max-w-[700px] sm:text-[13px] sm:max-w-[90%] sm:mt-2 md:text-[15px]">
            Discovering his ties to an ancient order, he embarks on a
            treacherous quest that takes him back to Ottoman Istanbul.
          </p>

          <div className="btns flex gap-[10px] mt-[30px] sm:mt-[15px] sm:gap-[6px]">
            <Link to="/player">
              <button className="btn-play pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#fff] text-[#000] cursor-pointer rounded-[5px] sm:text-[12px] sm:px-[14px] sm:pt-[6px] sm:pb-[6px] md:text-[14px]">
                <img src={play_icon} className="w-[25px] sm:w-[18px]" alt="" />
                Play
              </button>
            </Link>

            <button
              onClick={() => handleMoreInfo(movies[0])}
              className="btn-inf pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#79797986] text-[#000] cursor-pointer rounded-[5px] sm:text-[12px] sm:px-[14px] sm:pt-[6px] sm:pb-[6px] md:text-[14px]"
            >
              <img
                src={info_icon}
                className="btn-dark w-[25px] sm:w-[18px]"
                alt=""
              />
              More Info
            </button>
          </div>
        </div>

        <div className="absolute inset-0 z-10 bg-black/60"></div>
      </div>

      {/* Модалка */}
      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />

      <div className="mt-[-50px] relative px-[6%] sm:mt-[-40px] sm:px-[4%]">
        <TitleCards title="Popular on Netflix" category="popular" />
        <TitleCards title="Top Rated" category="top_rated" />
        <TitleCards title="Trending This Week" category="trending/movie/week" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Now Playing" category="now_playing" />
        <TitleCards title="Trending Today" category="trending/movie/day" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
