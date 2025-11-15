import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YTJhZGJkNGNjZDUwZGFmMzM4MGI5ZmY2M2Q1NTI5MSIsIm5iZiI6MTc2MzA1Mjk1Mi44NDksInN1YiI6IjY5MTYwZDk4ZGZhMGQ3ODA3Njg3NjRhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EdeYcHJbxDyv54BQNPh9zJmnUu79Fmte9zqBTOTXU1A",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="title-cards pr-[50px] mt-[50px] ">
      <h2 className="mb-[8px]">{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list overflow-x-scroll flex gap-[8px]">
        {apiData.map((card, index) => {
          return (
            <div className="card relative " key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                className="card-img max-w-[250px] rounded-[5px] "
                alt=""
              />
              <p className="absolute right-[10px] bottom-[10px]">
                {card.original_title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
