import React from "react";
import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import HoverCardL from "./HoverCardL";
import { useState } from "react";


const Latest = ({ favorites, onAddToFavorites, onRemoveFromFavorites }) => {
  return (
    <div>
      <Navbar />
      <div className="category-cards pt-[120px]">
        <TitleCards title="Top Rated" category="top_rated" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
        <TitleCards title="Trending This Week" category="trending/movie/week" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
        <TitleCards title="Upcoming" category="upcoming" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
        <TitleCards title="Popular" category="popular" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
        <TitleCards title="Now Playing" category="now_playing" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
        <TitleCards title="Trending Today" category="trending/movie/day" onAdd={onAddToFavorites} onRemove={onRemoveFromFavorites} favorites={favorites} />
      </div>
      <Footer />
    </div>
  );
};

export default Latest;
