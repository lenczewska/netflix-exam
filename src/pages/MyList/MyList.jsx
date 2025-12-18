import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const MyList = ({ favorites, setFavorites }) => {
  const handleRemove = (id) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

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
                className="relative bg-[#000] p-4 rounded shadow text-center overflow-hidden group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                  alt={item.original_title || item.name}
                  className="w-full rounded mb-2"
                />
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-4">
                  <div className="flex gap-4">
                    <a
                      href={`/player/${item.id}`}
                      className="flex items-center justify-center"
                    >
                      <button className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl hover:scale-110 transition-transform">
                        ▶
                      </button>
                    </a>
                    <button
                      className="bg-red-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl hover:scale-110 transition-transform"
                      onClick={() => handleRemove(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="relative z-10">{item.original_title || item.name}</p>
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
