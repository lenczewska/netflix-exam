import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import HoverCard from "../../components/TitleCards/HoverCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query");

  const [items, setItems] = useState([]);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoverCardDetail, setHoverCardDetail] = useState({});
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

  const fetchDetail = useCallback(
    async (item) => {
      if (hoverCardDetail.id === item.id || isLoadingDetail) return;
      setIsLoadingDetail(true);

      try {
        const endpoint = item.media_type === "tv" ? "tv" : "movie";
        const res = await fetch(
          `${BASE_URL}/${endpoint}/${item.id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await res.json();
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
          Результаты поиска:{" "}
          <span className="text-[40px] text-[#fff]">{query}</span>
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {items
            .filter((item) => item.poster_path) 
            .map((item) => (
              <div
                key={item.id}
                className="relative bg-[#111] w-[240px] h-[310px] rounded flex flex-col"
                onMouseEnter={() => {
                  setHoveredCardId(item.id);
                  fetchDetail(item);
                }}
                onMouseLeave={() => setHoveredCardId(null)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-[250px] pt-[10px] object-cover object-center"
                />
                <p className="text-sm text-center pt-[5px] pb-[5px] ">
                  {item.title || item.name}
                </p>
                {hoveredCardId === item.id &&
                  hoverCardDetail.id === item.id && (
                    <HoverCard data={hoverCardDetail} />
                  )}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
