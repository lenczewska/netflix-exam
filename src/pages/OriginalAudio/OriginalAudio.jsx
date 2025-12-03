import { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TitleCards from "../../components/TitleCards/TitleCards";

const OriginalAudio = () => {
  const [englishOptions, setEnglishOptions] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/configuration/languages?api_key=5a2adbd4ccd50daf3380b9ff63d55291"
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const langs = data
            .map((lang) => ({
              name: lang.english_name,
              link: `/language/${lang.iso_639_1}`,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "en"));
          setEnglishOptions(langs);
        } else {
          console.error("TMDB error:", data);
        }
      })
      .catch((err) => console.error("Fetch failed:", err));
  }, []);

  const [openOriginal, setOpenOriginal] = useState(false);
  const [openEnglish, setOpenEnglish] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const originalRef = useRef(null);
  const englishRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (originalRef.current && !originalRef.current.contains(event.target)) {
        setOpenOriginal(false);
      }
      if (englishRef.current && !englishRef.current.contains(event.target)) {
        setOpenEnglish(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setOpenSort(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const originalLanguages = [
    { name: "Original Language", link: "/genres/action" },
    { name: "Dubbing", link: "/genres/anime" },
    { name: "Subtitles", link: "/genres/anime" },
  ];

  const sortOptions = [
    { name: "Suggestions for you", link: "/sort/newest" },
    { name: "Year Released", link: "/sort/year" },
    { name: "A-Z", link: "/sort/az" },
    { name: "Z-A", link: "/sort/za" },
  ];

  return (
    <div>
      <Navbar />

      <p className="pl-[45px] text-[27px] pt-[80px]">Browse by Languages</p>

      <div className="sorting-box flex items-center gap-[15px] pl-[45px] pt-[10px]">
        <p className="text-[14px]">Select Your Preferences</p>

        <div ref={originalRef} className="relative inline-block">
          <button
            onClick={() => setOpenOriginal(!openOriginal)}
            className="bg-[#000] cursor-pointer w-[190px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            Original Language
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openOriginal && (
            <div className="absolute left-0 mt-2 w-[190px] bg-[#000] text-[#fff] shadow-lg rounded z-10">
              <ul className="p-[8px]">
                {originalLanguages.map((genre, index) => (
                  <li key={index}>
                    <p
                      href=""
                      className="block pt-[5px] hover:underline"
                    >
                      {genre.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div ref={englishRef} className="relative inline-block">
          <button
            onClick={() => setOpenEnglish(!openEnglish)}
            className="bg-[#000] w-[250px] cursor-pointer pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            English
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openEnglish && (
            <div className="absolute left-0 mt-2 bg-[#000] w-[250px] text-[#fff] shadow-lg rounded z-50">
              <ul className="p-[8px] max-h-[400px] overflow-y-auto">
                {englishOptions.map((opt, index) => (
                  <li key={index}>
                    <p
                      href=""
                      className="block px-4 py-2 hover:bg-gray-700 hover:underline"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="text-[14px]">Sort by</p>

        <div ref={sortRef} className="relative inline-block">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="bg-[#000] w-[230px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded cursor-pointer"
          >
            A-Z
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openSort && (
            <div className="absolute left-0 mt-2 w-[230px] bg-[#000] text-[#fff] shadow-lg rounded z-10">
              <ul className="p-[8px]">
                {sortOptions.map((opt, index) => (
                  <li key={index}>
                    <p
                      href=""
                      className="block px-4 py-2 hover:underline"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <TitleCards/>

      <Footer />
    </div>
  );
};

export default OriginalAudio;
