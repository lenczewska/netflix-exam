import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/img/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";
const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER;

const Player = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
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
        onClick={() => {
          navigate(-1);
        }}
        src={back_arrow_icon}
        className="absolute top-[20px] left-[20px] w-[50px] cursor-pointer"
        alt="Back"
      />
      {apiData.key ? (
        <iframe
          className="w-[90%] h-[90%] rounded-[10px]"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}

      <div className="player-inf flex items-center justify-between w-[90%] mt-4">
        <p>
          {apiData.published_at &&
            new Date(apiData.published_at).toLocaleDateString()}
        </p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
