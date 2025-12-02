import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import TitleCards from "../../components/TitleCards/TitleCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
const Movies = () => {
  const [open, setOpen] = useState(false);

  const genres = [
    { name: "Action", link: "/genres/comedy" },
    { name: "Anime", link: "/genres/drama" },
    { name: "British", link: "/genres/action" },
    { name: "Comedies", link: "/genres/sci-fi" },
  ];

  const sortedGenres = [...genres].sort((a, b) =>
    a.name.localeCompare(b.name, "en")
  );

  return (
    <div>
      <Navbar />

      <div className="pt-[50px] w-screen h-screen ">
        <div className="flex items-baseline gap-[40px] ">
          <p className="pl-[45px] text-[35px] font-black pt-[50px]">Movies</p>

          <div className="relative inline-block mt-4">
            <button
              onClick={() => setOpen(!open)}
              className=" bg-[#000] border px-[10px] text-white rounded"
            >
              Genres{" "}
              <FontAwesomeIcon icon={faCaretDown} className="text-white" />
            </button>

            {open && (
              <div className="absolute bg-[#000] text-[#fff] mt-2 w-48 bg-white shadow-lg rounded z-10">
                <ul className="py-2">
                  {sortedGenres.map((genre, index) => (
                    <li key={index}>
                      <a
                        href={genre.link}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {genre.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-screen h-screen pt-[50px] flex justify-center items-center">
        {" "}
        Burda kinolar random cixacaq, gozlemede qalin :)
      </div>
      
      <div className="category-cards">
        <TitleCards title="Today's Top Pick for You" category="top_rated" />
        <TitleCards title="Action Movies" category="popular" />
        <TitleCards title="" category="upcoming" />
        <TitleCards title="We Think You'll Love These" category="now_playing" />
      </div>
      <Footer />
    </div>
  );
};

export default Movies;
