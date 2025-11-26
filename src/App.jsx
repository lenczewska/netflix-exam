import React, { useEffect } from "react";
import Home from "./pages/Home/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Player from "./pages/Player/Player";
import HeroPlayer from "./pages/Player/HeroPlayer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireBase";

function App() {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user)=>{
      if(user){
        console.log("Logged in")
        navigate('/browse')
      }
      else{
        console.log("Logged out");
        navigate('/login')
      }
    })
  },[])


  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/browse" /> } /> */}
        <Route path="/browse" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/player/:id" element={<Player />} />
        <Route path="/trailer" element={<HeroPlayer />} />
      </Routes>
    </div>
  );
}

export default App;
