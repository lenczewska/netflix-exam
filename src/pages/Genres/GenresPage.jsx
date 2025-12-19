import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HoverCard from "../../components/TitleCards/HoverCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const GenresPage = () => {
  const { type, id } = useParams();
  const [items, setItems] = useState([]);
  const [genreName, setGenreName] = useState("");
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoverCardDetail, setHoverCardDetail] = useState({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    const endpoint = type === "movies" ? "movie" : "tv";

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/discover/${endpoint}?api_key=${API_KEY}&with_genres=${id}&language=en-US&page=1`
        );
        const data = await res.json();
        setItems(data.results || []);

        const genresRes = await fetch(
          `${BASE_URL}/genre/${endpoint}/list?api_key=${API_KEY}&language=en-US`
        );
        const genresData = await genresRes.json();
        const found = genresData.genres?.find((g) => g.id === Number(id));
        setGenreName(found ? found.name : "");
      } catch (err) {
        console.error("Ошибка в GenrePage:", err);
      }
    };

    fetchData();
  }, [type, id]);

  const fetchMovieDetail = useCallback(
    async (movieId) => {
      if (hoverCardDetail.id === movieId || isLoadingDetail) return;

      setIsLoadingDetail(true);

      try {
        const detailUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        const response = await fetch(detailUrl);
        const data = await response.json();
        setHoverCardDetail(data);
      } catch {
        setHoverCardDetail({});
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [hoverCardDetail.id, isLoadingDetail]
  );

  return (
    <div>
      <Navbar />
      <div className="pt-[80px] px-[40px] text-white">
        <h2 className="text-[20px] text-[#aaa] font-bold mb-6">
          <Link to={`/${type}`} className="hover:text-white">
            {type === "movies" ? "Movies" : "Shows"}
          </Link>{" "}
          {">"} <span className="text-[40px] text-[#fff]">{genreName}</span>
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative bg-[#111] w-[240px] h-[310px] rounded  flex flex-col"
              onMouseEnter={() => {
                setHoveredCardId(item.id);
                fetchMovieDetail(item.id);
              }}
              onMouseLeave={() => setHoveredCardId(null)}
            >
              {" "}
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-[250px] pt-[10px] object-center"
              />
              <p className="text-sm text-center pt-[5px] pb-[5px] ">
                {item.title || item.name}
              </p>
              {hoveredCardId === item.id && hoverCardDetail.id === item.id && (
                <HoverCard data={hoverCardDetail} />
              )}{" "}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
