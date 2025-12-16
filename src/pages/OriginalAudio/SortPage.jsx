import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";

const SortPage = () => {
  const { sortType } = useParams();

  return (
    <div>
      <Navbar />
      <p className="pl-[45px] text-[27px] pt-[80px]">Sorted by: {sortType}</p>
      <div className="pl-[45px]">
        <TitleCards sort={sortType} />
      </div>
      <Footer />
    </div>
  );
};

export default SortPage;
