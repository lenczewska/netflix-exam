import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const OriginalAudio = () => {
  const [open, setOpen] = useState(null); 

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

      <p className="pl-[45px] text-[27px] pt-[80px]">Browse by Languages</p>

      <div className="sorting-box flex gap-[15px] pl-[45px] pt-[10px]">
        <p className="text-[14px]">Select Your Preferences</p>

        <div className="relative inline-block">
          <button
            onClick={() => setOpen(open === "original" ? null : "original")}
            className="bg-[#000] border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            Original Language{" "}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {open === "original" && (
            <div className="absolute left-0 mt-2 w-48 bg-[#000] text-[#fff] shadow-lg rounded z-10">
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

        <div className="relative inline-block">
          <button
            onClick={() => setOpen(open === "english" ? null : "english")}
            className="bg-[#000] border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            English{" "}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {open === "english" && (
            <div className="absolute left-0 mt-2 w-48 bg-[#000] text-[#fff] shadow-lg rounded z-10">
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

      <Footer />
    </div>
  );
};

export default OriginalAudio;
