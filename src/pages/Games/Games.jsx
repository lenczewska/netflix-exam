import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import GameCards from "../../components/GameCards/GameCards";

import games_page from "../../assets/img/games_page.webp";

const Games = () => {
  return (
    <div>
      <Navbar />

      <div className="w-screen h-screen pt-[50px] flex justify-center items-center" > Burda oyunlar random cixacaq, gozlemede qalin :)</div>


      <div className="category-cards pl-[3%]">
        <GameCards title="Popular Mobile Games for You" genres="Unknown" />
        <GameCards title="Pick Up and Play Mobile Games" genres="Puzzle" />
      </div>

      <div className="w-screen h-[320px] mt-[30px] bg-[#000] flex justify-between   ">
        <div className="txt-box flex  flex-col pl-[45px] justify-center">
          <h2 className="font-[600] text-[32px] font-unset">
            Find more games in the mobile app
          </h2>
          <h6 className="font-[400] text-[16px] font-unset">
            From tamiliar favorites to Netflix exclusives, get unlimited mobile
            games in the Netflix app - all included with your membership.
          </h6>
        </div>
        <img
          src={games_page}
          className="w-[55%] flex   object-cover pt-[20px] "
          alt=""
        />
      </div>

      <Footer />
    </div>
  );
};

export default Games;
