import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Games = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen flex items-center justify-center h-screen ">
        <p className="text-[#666666] text-xl">
          Oyunlari hardan firladacagimi hele tapammadim :).
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Games;
