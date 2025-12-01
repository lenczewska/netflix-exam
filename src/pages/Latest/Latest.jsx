import React from "react";
import "./Latest.css";
import Navbar from "../../components/Navbar/Navbar";
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";

const Latest = () => {
  return (
    <div>
      <Navbar  />

      <div className="category-cards pt-[50px]">
        <TitleCards title="Romantic TV Shows" category="top_rated" />
        <TitleCards title="Hollywood Movies" category="popular" />
        <TitleCards title="New On Netflix" category="upcoming" />
        <TitleCards title="Only On Netflix" category="now_playing" />
      </div>

      <Footer />
    </div>
  );
};

export default Latest;
