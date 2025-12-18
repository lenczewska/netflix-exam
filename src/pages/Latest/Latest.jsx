import React, { useState, useEffect } from "react";

import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import HoverCardL from "./HoverCardL";
import MovieInfoModal from "../Home/MovieInfoModal";

const Latest = () => {
  const [modalMovie, setModalMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (movie) => {
    setModalMovie(movie);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setModalMovie(null);
  };
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div>
      <Navbar />
      <div className="category-cards pt-[120px]">
        <TitleCards
          title="Top Rated"
          category="top_rated"
          onOpenModal={handleOpenModal}
        />
        <TitleCards
          title="Trending This Week"
          category="trending/movie/week"
          onOpenModal={handleOpenModal}
        />
        <TitleCards
          title="Upcoming"
          category="upcoming"
          onOpenModal={handleOpenModal}
        />
        <TitleCards
          title="Popular"
          category="popular"
          onOpenModal={handleOpenModal}
        />
        <TitleCards
          title="Now Playing"
          category="now_playing"
          onOpenModal={handleOpenModal}
        />
        <TitleCards
          title="Trending Today"
          category="trending/movie/day"
          onOpenModal={handleOpenModal}
        />
      </div>
      <MovieInfoModal
        show={showModal}
        movie={modalMovie}
        onClose={handleCloseModal}
      />
      <Footer />
    </div>
  );
};

export default Latest;
