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

      <div className="hero-banner  relative ">
        <img
          src={hero_banner2}
          alt=""
          className="hero-banner-img w-full mb-[50px]"
        />
      </div>

      <div className="hero-title w-full absolute pl-[6%] top-3/12 ">
        <img
          src={hero_title}
          className=" w-[90%] max-w-[420px] mt-[30px]"
          alt=""
        />
        <p className="max-w-[700px] text-[17px] mt-[30px] mb-[20px]">
          Discovering his ties to an ancient order and embarks on a treacherous
          quest that soon takes him back to Ottoman Istanbul.
        </p>

        <div className="btns flex gap-[10px] mt-[30px] ">
          <Link to="/player">
            <button className="btn-play  pt-[8px] pb-[8px] pl-[20px] pr-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#fff] text-[#0000] cursor-pointer rounded-[5px] ">
              <img src={play_icon} className=" w-[25px] " alt="" />
              Play
            </button>
          </Link>
          <button className=" btn-inf pt-[8px] pb-[8px] pl-[20px] pr-[20px] inline-flex items-center gap-[10px] text-[15px] font-semibold bg-[#79797986] text-[#0000] cursor-pointer rounded-[5px] ">
            <img src={info_icon} className="btn-dark  w-[25px]" alt="" />
            More Info
          </button>
        </div>

        <TitleCards />
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

export default Home;
