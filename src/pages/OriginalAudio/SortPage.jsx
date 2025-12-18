
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";

const SortPage = () => {
  const location = useLocation();
  const original = location.state?.original || "original";
  const language = location.state?.language || "all";
  const alpha = location.state?.alpha || "az";

  return (
    <div>
      <Navbar />
      <p className="pl-[45px] text-[27px] pt-[80px]">Sorted by: {alpha === "za" ? "Z-A" : "A-Z"}</p>
      <div className="pl-[45px]">
        <TitleCards original={original} language={language} alpha={alpha} />
      </div>
      <Footer />
    </div>
  );
};

export default SortPage;
