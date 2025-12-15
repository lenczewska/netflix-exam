import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase";
import Shows from "./pages/Shows/Shows";
import GenrePage from "./pages/Genres/GenresPage";
import Movies from "./pages/Movies/Movies";
import Games from "./pages/Games/Games";
import Latest from "./pages/Latest/Latest";
import MyList from "./pages/MyList/MyList";
import OriginalAudio from "./pages/OriginalAudio/OriginalAudio";
import SearchPage from "./pages/Search/SearchPage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToFavorites = (movie) => {
      console.log("ADD TO FAVORITES:", movie);

    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (location.pathname === "/login" || location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        if (location.pathname !== "/login") {
          navigate("/login");
        }
      }
    });

    return () => unsubscribe();
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/browse" />} />
      <Route path="/browse" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path="/shows" element={<Shows />} />
      <Route path="/:type/genres/:id" element={<GenrePage />} />
      <Route
        path="/movies"
        element={
          <Movies
            favorites={favorites}
            onAddToFavorites={handleAddToFavorites}
          />
        }
      />
      <Route path="/games" element={<Games />} />
      <Route path="/latest" element={<Latest />} />
      <Route path="/my-list" element={<MyList favorites={favorites} />} />
      <Route path="/original-audio" element={<OriginalAudio />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
