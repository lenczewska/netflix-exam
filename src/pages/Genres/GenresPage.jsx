import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const GenrePage = () => {
  const { type, id } = useParams(); 
  const [items, setItems] = useState([]);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    const endpoint = type === "movies" ? "movie" : "tv";

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/${endpoint}?api_key=${API_KEY}&with_genres=${id}&language=en-US&page=1`
        );
        const data = await res.json();
        setItems(data.results || []);

        const genresRes = await fetch(
          `https://api.themoviedb.org/3/genre/${endpoint}/list?api_key=${API_KEY}&language=en-US`
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
          {'>'} <span className="text-[40px] text-[#fff]">{genreName}</span>
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-[#111] p-4 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="rounded mb-2"
              />
              <p className="text-sm">{item.title || item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenrePage;
