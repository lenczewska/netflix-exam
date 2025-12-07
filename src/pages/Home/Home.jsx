import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import hero_banner2 from "../../assets/img/hero_banner2.webp";
import hero_title from "../../assets/img/hero_title.png";
import play_icon from "../../assets/img/play_icon.png";
import info_icon from "../../assets/img/info_icon.png";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <Navbar />

      <div className="hero-banner relative">
        <img
          src={hero_banner2}
          alt=""
          className="hero-banner-img w-full mb-[50px] 
          sm:mb-[20px] sm:h-[260px] object-cover
          md:h-[380px]"
        />
      </div>

      <div
        className="hero-title w-full absolute pl-[6%] top-3/12 
        sm:top-[22%] sm:pl-[4%]
        md:top-[26%]"
      >
        <img
          src={hero_title}
          className="w-[90%] max-w-[420px] mt-[30px]
          sm:max-w-[250px] sm:mt-[10px]
          md:max-w-[330px]"
          alt=""
        />

        <p
          className="max-w-[700px] text-[17px] mt-[30px] mb-[20px]
          sm:text-[13px] sm:max-w-[90%] sm:mt-[10px]
          md:text-[15px]"
        >
          Discovering his ties to an ancient order and embarks on a treacherous
          quest that soon takes him back to Ottoman Istanbul.
        </p>

        <div
          className="btns flex gap-[10px] mt-[30px]
          sm:mt-[15px] sm:gap-[6px]"
        >
          <Link to="/player">
            <button
              className="btn-play pt-[8px] pb-[8px] px-[20px] inline-flex 
              items-center gap-[10px] text-[15px] font-semibold 
              bg-[#fff] text-[#0000] cursor-pointer rounded-[5px]

              sm:text-[12px] sm:px-[14px] sm:pt-[6px] sm:pb-[6px]
              md:text-[14px]"
            >
              <img
                src={play_icon}
                className="w-[25px] sm:w-[18px]"
                alt=""
              />
              Play
            </button>
          </Link>

          <button
            className="btn-inf pt-[8px] pb-[8px] px-[20px] inline-flex 
            items-center gap-[10px] text-[15px] font-semibold 
            bg-[#79797986] text-[#0000] cursor-pointer rounded-[5px]

            sm:text-[12px] sm:px-[14px] sm:pt-[6px] sm:pb-[6px]
            md:text-[14px]"
          >
            <img
              src={info_icon}
              className="btn-dark w-[25px] sm:w-[18px]"
              alt=""
            />
            More Info
          </button>
        </div>

        <div className="sm:mt-[10px] md:mt-[15px]">
          <TitleCards />
        </div>
      </div>

      <div className="category-cards mt-10 sm:mt-6 md:mt-8">
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

export default Home;
