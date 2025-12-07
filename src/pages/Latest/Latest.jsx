import React from "react";
import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Latest = () => {
  return (
    <div>
      <Navbar  />

      <div className="category-cards pt-[50px]">
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

export default Latest;
