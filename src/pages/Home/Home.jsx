import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import Player from "../Player/Player";
import MovieInfoModal from "./MovieInfoModal";
import hero_banner2 from "../../assets/img/hero_banner2.jpg";
import hero_title from "../../assets/img/hero_title.png";
import play_icon from "../../assets/img/play_icon.png";
import info_icon from "../../assets/img/info_icon.png";
import { Link } from "react-router-dom";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
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
      cast: [
        { name: "Tom Hanks" },
        { name: "Emma Stone" },
        { name: "Benedict Cumberbatch" },
      ],
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
      cast: [
        { name: "Matthew McConaughey" },
        { name: "Anne Hathaway" },
        { name: "Michael B. Jordan" },
      ],
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
          className="hero-banner-img w-full object-cover h-[650px] "
        />

        <div className="hero-content absolute top-[35%] left-[6%]  z-20 max-w-[600px]">
          <img
            src={hero_title}
            className="w-[90%] max-w-[420px]"
            alt=""
          />

          <p className="mt-[30px] mb-5 text-[17px] max-w-[700px] ">
            Discovering his ties to an ancient order, he embarks on a
            treacherous quest that takes him back to Ottoman Istanbul.
          </p>

          <div className="btns flex gap-[10px] mt-[30px] ">
            <Link to="/player">
              <button className="btn-play pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#fff] text-[#000] cursor-pointer rounded-[5px]  ">
                <img src={play_icon} className="w-[25px] " alt="" />
                Play
              </button>
            </Link>

            <button
              onClick={() => handleMoreInfo(movies[0])}
              className="btn-inf pt-[8px] pb-[8px] px-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#79797986] text-[#000] cursor-pointer rounded-[5px]  "
            >
              <img
                src={info_icon}
                className="btn-dark w-[25px] "
                alt=""
              />
              More Info
            </button>
          </div>
        </div>

        <div className="absolute  inset-0 z-10 bg-black/20"></div>
      </div>

      {/* Модалка */}
      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />


      {/* Title Cards */}
      <div className="mt-[10px] relative px-[60px] z-10">
        <TitleCards title="Popular on Netflix" category="popular" handleMoreInfo={handleMoreInfo} />
        <TitleCards title="Top Rated" category="top_rated" handleMoreInfo={handleMoreInfo} />
        <TitleCards title="Trending This Week" category="trending/movie/week" handleMoreInfo={handleMoreInfo} />
        <TitleCards title="Upcoming" category="upcoming" handleMoreInfo={handleMoreInfo} />
        <TitleCards title="Now Playing" category="now_playing" handleMoreInfo={handleMoreInfo} />
        <TitleCards title="Trending Today" category="trending/movie/day" handleMoreInfo={handleMoreInfo} />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
