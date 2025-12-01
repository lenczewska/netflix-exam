import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

const MyList = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="min-h-screen  ">
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <p className="pl-[45px] text-[27px] pt-[80px] "> My List</p>

      <div className=" flex items-center justify-center ">
        {favorites.length === 0 ? (
          <div className="w-screen flex items-center justify-center h-screen ">
            <p className="text-[#666666] text-xl">
              You haven't added any titles to your list yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 p-6">
            {favorites.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded shadow text-center"
              >
                {item.title}
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyList;
