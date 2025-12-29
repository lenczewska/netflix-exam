import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/Cards/MovieCards";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";
import { useState } from "react";
import { useEffect } from "react";

const SortPage = () => {
  const location = useLocation();
  const original = location.state?.original || "original";
  const language = location.state?.language || "all";
  const alpha = location.state?.alpha || "az";
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div>
      <Navbar />
      <p className="pl-[45px] text-[27px] pt-[80px]">
        Sorted by: {alpha === "za" ? "Z-A" : "A-Z"}
      </p>
      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />
      <div className="pl-[45px]">
        <TitleCards
          original={original}
          language={language}
          alpha={alpha}
          favorites={favorites}
          onAdd={(movie) =>
            setFavorites((prev) =>
              prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
            )
          }
          onRemove={(movie) =>
            setFavorites((prev) => prev.filter((m) => m.id !== movie.id))
          }
          onOpenModal={openModal}
        />
      </div>
      <Footer />
    </div>
  );
};

export default SortPage;
