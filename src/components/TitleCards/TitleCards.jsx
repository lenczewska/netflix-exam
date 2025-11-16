import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTJhZGJkNGNjZDUwZGFmMzM4MGI5ZmY2M2Q1NTI5MSIsIm5iZiI6MTc2MzA1Mjk1Mi44NDksInN1YiI6IjY5MTYwZDk4ZGZhMGQ3ODA3Njg3NjRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EdeYcHJbxDyv54BQNPh9zJmnUu79Fmte9zqBTOTXU1A",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results || []))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="title-cards pr-[50px] mt-[50px]">
      <h2 className="mb-[8px]">{title || "Popular on Netflix"}</h2>
      <div className="card-list overflow-x-scroll flex gap-[8px]">
        {apiData.map((card) => (
          <Link to={`/player/${card.id}`} className="card relative" key={card.id}>
            {card.backdrop_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                className="card-img max-w-[250px] rounded-[5px]"
                alt={card.original_title}
              />
            )}
            <p className="absolute right-[10px] bottom-[10px]">
              {card.original_title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
