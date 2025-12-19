import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const GenresPage = () => {
  const { type, id } = useParams();
  const [items, setItems] = useState([]);
  const [genreName, setGenreName] = useState("");

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
              className="relative group bg-[#111] w-[240px] h-[310px] rounded flex flex-col"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="w-full h-[250px] pt-[10px] object-center rounded"
              />

              <div className="absolute inset-0 bg-black/60 flex items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Link
                  to={`/player/${item.id}`}
                  className="flex items-center justify-center"
                >
                  <button className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl hover:scale-110 transition-transform">
                    ▶
                  </button>
                </Link>
              </div>

              <p className="text-sm text-center pt-[5px] pb-[5px]">
                {item.title || item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenresPage;
