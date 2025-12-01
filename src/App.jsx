import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase";
import Shows from "./pages/Shows/Shows";
import Movies from "./pages/Movies/Movies";
import Games from "./pages/Games/Games";
import Latest from "./pages/Latest/Latest";
import MyList from "./pages/MyList/MyList";
import OriginalAudio from "./pages/OriginalAudio/OriginalAudio";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged in");
        navigate("/browse");
      } else {
        console.log("Logged out");
        navigate("/login");
      }
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/browse" />} />
        <Route path="/browse" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/games" element={<Games />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/my-list" element={<MyList />} />
        <Route path="/original-audio" element={<OriginalAudio/>} />
      </Routes>
    </div>
  );
}

export default App;
