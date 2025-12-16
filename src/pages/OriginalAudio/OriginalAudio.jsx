import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TitleCards from "../../components/TitleCards/TitleCards";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const OriginalAudio = () => {
  const [englishOptions, setEnglishOptions] = useState([]);
  const [selectedOriginal, setSelectedOriginal] = useState({
    name: "Original Language",
    value: "original",
  });
  const [selectedEnglish, setSelectedEnglish] = useState({
    name: "English",
    code: "en",
  });
  const [selectedSort, setSelectedSort] = useState({
    name: "A-Z",
    value: "az",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${VITE_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const langs = data
            .map((lang) => ({
              name: lang.english_name,
              code: lang.iso_639_1,
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "en"));
          setEnglishOptions(langs);
        }
      })
      .catch((err) => console.error(err));
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const originalLanguages = [
    { name: "Original Language", value: "original" },
    { name: "Dubbing", value: "dubbing" },
    { name: "Subtitles", value: "subtitles" },
  ];

  const sortOptions = [
    { name: "Suggestions for you", value: "suggestions" },
    { name: "Year Released", value: "year" },
    { name: "A-Z", value: "az" },
    { name: "Z-A", value: "za" },
  ];

  return (
    <div>
      <Navbar />

      <p className="pl-[45px] text-[27px] pt-[80px]">Browse by Languages</p>

      <div className="sorting-box flex items-center gap-[15px] pl-[45px] pt-[10px]">
        <p className="text-[14px]">Select Your Preferences</p>

        {/* Original Language */}
        <div ref={originalRef} className="relative inline-block">
          <button
            onClick={() => setOpenOriginal(!openOriginal)}
            className="bg-[#000] cursor-pointer w-[190px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            {selectedOriginal.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openOriginal && (
            <div className="absolute left-0 mt-2 w-[190px] bg-[#000] text-[#fff] shadow-lg rounded z-10">
              <ul className="p-[8px]">
                {originalLanguages.map((lang) => (
                  <li key={lang.value}>
                    <p
                      onClick={() => {
                        setSelectedOriginal(lang);
                        setOpenOriginal(false);
                      }}
                      className="block pt-[5px] hover:underline cursor-pointer"
                    >
                      {lang.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* English */}
        <div ref={englishRef} className="relative inline-block">
          <button
            onClick={() => setOpenEnglish(!openEnglish)}
            className="bg-[#000] w-[250px] cursor-pointer pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            {selectedEnglish.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openEnglish && (
            <div className="absolute left-0 mt-2 bg-[#000] w-[250px] text-[#fff] shadow-lg rounded z-50">
              <ul className="p-[8px] max-h-[400px] overflow-y-auto">
                {englishOptions.map((opt) => (
                  <li key={opt.code}>
                    <p
                      onClick={() => {
                        setSelectedEnglish(opt);
                        setOpenEnglish(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-700 hover:underline cursor-pointer"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Sort */}
        <p className="text-[14px]">Sort by</p>
        <div ref={sortRef} className="relative inline-block">
          <button
            onClick={() => setOpenSort(!openSort)}
            className="bg-[#000] w-[230px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded cursor-pointer"
          >
            {selectedSort.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>

          {openSort && (
            <div className="absolute left-0 mt-2 w-[230px] bg-[#000] text-[#fff] shadow-lg rounded z-10">
              <ul className="p-[8px]">
                {sortOptions.map((opt) => (
                  <li key={opt.value}>
                    <p
                      onClick={() => {
                        setSelectedSort(opt);
                        setOpenSort(false);
                        navigate(`/sort/${opt.value}`);
                      }}
                      className="block px-4 py-2 hover:underline cursor-pointer"
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

      <div className="pl-[45px] pt-[20px]">
        <TitleCards
          original={selectedOriginal.value}
          english={selectedEnglish.code}
          sort={selectedSort.value}
        />
      </div>

      <Footer />
    </div>
  );
};

export default OriginalAudio;
