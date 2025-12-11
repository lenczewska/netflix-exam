import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState("");

  useEffect(() => {
    // Получаем фильмы по жанру
    const fetchMoviesByGenre = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${id}&language=en-US&page=1`
      );
      const data = await res.json();
      setMovies(data.results);
    };

    // Получаем список жанров и находим название по id
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const found = data.genres.find((g) => g.id === Number(id));
      setGenreName(found ? found.name : "");
    };

    fetchMoviesByGenre();
    fetchGenres();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className="pt-[80px] px-[40px] text-white">
        <h2 className="text-[20px] text-[#aaa] font-bold mb-6">
         <Link to="/shows" > Shows</Link> {'>'} <span className="text-[40px] text-[#fff] ">{genreName}</span>
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="bg-[#111] p-4 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
              <p className="text-sm">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GenrePage;
