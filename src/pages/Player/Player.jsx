import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/img/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER;
const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const Player = () => {
  const { id } = useParams(); // берём id из URL
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${VITE_TMDB_API_KEY}&language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const trailer = res.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          setApiData(trailer || null);
        } else {
          setApiData(null);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="player h-screen flex flex-col justify-center items-center relative">
      <img
        onClick={() => navigate(-1)}
        src={back_arrow_icon}
        className="absolute top-[20px] left-[20px] w-[50px] cursor-pointer"
        alt="Back"
      />

      {apiData?.key ? (
        <iframe
          className="w-[90%] h-[90%] rounded-[10px]"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="text-white">No trailer available</p>
      )}

      {apiData && (
        <div className="player-inf flex items-center justify-between w-[90%] mt-4 text-white">
          <p>
            {apiData.published_at &&
              new Date(apiData.published_at).toLocaleDateString()}
          </p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      )}
    </div>
  );
};

export default Player;
