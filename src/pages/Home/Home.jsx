// Home.jsx (диагностическая версия)
import React, { useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import InfoModal from "./InfoModal";

import hero_banner2 from "../../assets/img/hero_banner2.jpg";
import hero_title from "../../assets/img/hero_title.png";
import play_icon from "../../assets/img/play_icon.png";
import info_icon from "../../assets/img/info_icon.png";
import { Link } from "react-router-dom";

const Home = () => {
  
  const [showInfoModal, setShowInfoModal] = useState(false);
  console.log("Home render, showInfoModal =", showInfoModal);


  const handleMoreInfo = () => {
    console.log("handleMoreInfo clicked — before set:", showInfoModal);
    setShowInfoModal(true);
    console.log(
      "handleMoreInfo clicked — after set (note: state update async)"
    );
  };

  const closeModal = () => {
    console.log("closeModal called");
    setShowInfoModal(false);
  };

  return (
    <div className="home w-full min-h-screen bg-black text-white ">
      <Navbar />

      <div className="relative w-full h-auto">
        <img
          src={hero_banner2}
          alt=""
          className="hero-banner-img w-full object-cover sm:h-[260px] md:h-[380px] h-[500px]"
        />

        {/* Hero Content */}
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
              onClick={() => {
                console.log("clicked");
                handleMoreInfo();
              }}
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

        {/* DARK GRADIENT OVERLAY */}
        {/* Если overlay перекрывает кнопки — сделаем z-10 (ниже z-20 у hero-content). */}
        <div className="absolute inset-0 z-10 bg-black/60"></div>
      </div>

      {/* Title cards */}
      <div className="mt-[-80px] relative z-30 px-[6%] sm:mt-[-40px] sm:px-[4%]">
        <TitleCards title="Popular on Netflix" category="popular" />
      </div>

      <div className="mt-10 px-[6%] sm:mt-6 sm:px-[4%]">
        <TitleCards title="Top Rated" category="top_rated" />
        <TitleCards title="Trending This Week" category="trending/movie/week" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Now Playing" category="now_playing" />
        <TitleCards title="Trending Today" category="trending/movie/day" />
      </div>

      <InfoModal show={showInfoModal} onClose={closeModal} />

      <Footer />
    </div>
  );
};

export default Home;
