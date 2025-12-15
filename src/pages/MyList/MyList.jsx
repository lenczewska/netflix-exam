import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MyList = ({ favorites }) => {
  return (
    <div className="min-h-screen">
      <Navbar className="fixed top-0 left-0 w-full z-50" />
      <p className="pl-[45px] text-[27px] pt-[80px]">My List</p>

      <div className="flex items-center justify-center">
        {favorites.length === 0 ? (
          <div className="w-screen flex items-center justify-center h-screen">
            <p className="text-[#666666] text-xl">
              You haven't added any titles to your list yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4 p-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-4 rounded shadow text-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.original_title || item.name}
                  className="w-full rounded mb-2"
                />
                <p>{item.original_title || item.name}</p>
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
