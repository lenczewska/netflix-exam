import React, { useState, useEffect } from "react";

import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import HoverCardL from "./HoverCardL";
import MovieInfoModal from "../Home/MovieInfoModal";

const Latest = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

const Latest = ({ favorites, onAddToFavorites, onRemoveFromFavorites }) => {
  return (
    <div>
      <Navbar />
      <div className="category-cards pt-[120px]">
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
