import React, { useState } from "react";
import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";

const Latest = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMoreInfo = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  return (
    <div>
      <Navbar />

      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />

      <div className="category-cards pt-[120px]">
        <TitleCards
          title="Popular on Netflix"
          category="popular"
          onOpenModal={handleMoreInfo}
        />
        <TitleCards
          title="Top Rated"
          category="top_rated"
          onOpenModal={handleMoreInfo}
        />
        <TitleCards
          title="Trending This Week"
          category="trending/movie/week"
          onOpenModal={handleMoreInfo}
        />
        <TitleCards
          title="Upcoming"
          category="upcoming"
          onOpenModal={handleMoreInfo}
        />
        <TitleCards
          title="Now Playing"
          category="now_playing"
          onOpenModal={handleMoreInfo}
        />
        <TitleCards
          title="Trending Today"
          category="trending/movie/day"
          onOpenModal={handleMoreInfo}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Latest;
