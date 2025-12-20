import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [items, setItems] = useState([]);

  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length === 0) {
      setItems([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1`
        );
        const data = await res.json();
        setItems(data.results || []);
      } catch (err) {
        console.error("Ошибка в SearchPage:", err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div>
      <Navbar />
      <div className="pt-[80px] px-[40px] text-white">
        <div className="grid grid-cols-4 gap-6">
          {items
            .filter((item) => item.poster_path)
            .map((item) => (
              <div
                key={item.id}
                className="relative group bg-[#111] w-[240px] h-[310px] rounded overflow-hidden"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-[250px] object-cover object-center rounded-t"
                />

                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                  <Link
                    to={`/player/${item.id}`}
                    className="w-[50px] h-[50px] text-[25px] flex justify-center items-center bg-white rounded-full text-[#000] hover:scale-110 transform transition-all duration-300"
                  >
                    ▶
                  </Link>
                </div>

                <p className="text-sm text-center pt-[5px] pb-[5px] ">
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

export default SearchPage;
