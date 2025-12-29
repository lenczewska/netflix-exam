import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import MovieCards from "../../components/Cards/MovieCards";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";
import "./OriginalAudio";

const VITE_TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const OriginalAudio = ({ favorites, setFavorites }) => {
  const [englishOptions, setEnglishOptions] = useState([]);
  const [selectedOriginal, setSelectedOriginal] = useState({
    name: "Original Audio",
    value: "original",
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openModal = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    document.documentElement.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

  const didMount = useRef(false);
  const userInteracted = useRef(false);

  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "All Languages",
    code: "all",
  });

  const [selectedAlpha, setSelectedAlpha] = useState({
    name: "A-Z",
    value: "az",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!userInteracted.current) return;

    navigate("/sort", {
      state: {
        original: selectedOriginal.value,
        language: selectedLanguage.code,
        alpha: selectedAlpha.value,
      },
      replace: true,
    });
  }, [selectedOriginal, selectedLanguage, selectedAlpha, navigate]);

  const handleOriginalChange = (opt) => {
    userInteracted.current = true;
    setSelectedOriginal(opt);
    setOpenOriginal(false);
  };

  const handleLanguageChange = (opt) => {
    userInteracted.current = true;
    setSelectedLanguage(opt);
    setOpenEnglish(false);
  };

  const handleAlphaChange = (opt) => {
    userInteracted.current = true;
    setSelectedAlpha(opt);
    setOpenSort(false);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/configuration/languages?api_key=${VITE_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEnglishOptions(
            data
              .map((lang) => ({
                name: lang.english_name,
                code: lang.iso_639_1,
              }))
              .sort((a, b) => a.name.localeCompare(b.name, "en"))
          );
        }
      })
      .catch(console.error);
  }, []);

  const [openOriginal, setOpenOriginal] = useState(false);
  const [openEnglish, setOpenEnglish] = useState(false);
  const [openSort, setOpenSort] = useState(false);

  const originalRef = useRef(null);
  const englishRef = useRef(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !originalRef.current?.contains(e.target) &&
        !englishRef.current?.contains(e.target) &&
        !sortRef.current?.contains(e.target)
      ) {
        setOpenOriginal(false);
        setOpenEnglish(false);
        setOpenSort(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const originalOptions = [
    { name: "Original Audio", value: "original" },
    { name: "Dubbing", value: "dubbing" },
  ];

  const alphaOptions = [
    { name: "A-Z", value: "az" },
    { name: "Z-A", value: "za" },
  ];

  return (
    <div>
      <Navbar />

      <p className="px-[15px] md:pl-[45px] text-[27px] pt-[100px] pb-[20px]">
        Browse by Languages
      </p>

      {/* SORTING */}
      <div className="sorting-box flex flex-col gap-[12px] px-[15px] pt-[10px] md:flex-row md:items-center md:gap-[15px] md:pl-[45px]">
        <p className="text-[14px]">Select Your Preferences</p>

        {/* ORIGINAL */}
        <div ref={originalRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenOriginal(!openOriginal);
            }}
            className="bg-[#000] w-full md:w-[190px] flex justify-between items-center border px-[10px] py-[5px] text-[13px] font-[500] text-white rounded"
          >
            {selectedOriginal.name}
            <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {openOriginal && (
            <div className="absolute left-0 mt-2 w-full md:w-[190px] bg-[#000] text-white rounded shadow z-10">
              <ul className="p-[8px]">
                {originalOptions.map((opt) => (
                  <li key={opt.value}>
                    <p
                      onClick={() => handleOriginalChange(opt)}
                      className="py-[5px] hover:underline cursor-pointer"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* LANGUAGE */}
        <div ref={englishRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenEnglish(!openEnglish);
            }}
            className="bg-[#000] w-full md:w-[250px] flex justify-between items-center border px-[10px] py-[5px] text-[13px] font-[500] text-white rounded"
          >
            {selectedLanguage.name}
            <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {openEnglish && (
            <div className="absolute left-0 mt-2 w-full md:w-[250px] bg-[#000] text-white rounded shadow z-50">
              <ul className="p-[8px] max-h-[400px] overflow-y-auto">
                <li>
                  <p
                    onClick={() =>
                      handleLanguageChange({
                        name: "All Languages",
                        code: "all",
                      })
                    }
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    All Languages
                  </p>
                </li>
                {englishOptions.map((opt) => (
                  <li key={opt.code}>
                    <p
                      onClick={() => handleLanguageChange(opt)}
                      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* SORT */}
        <div ref={sortRef} className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenSort(!openSort);
            }}
            className="bg-[#000] w-full md:w-[130px] flex justify-between items-center border px-[10px] py-[5px] text-[13px] font-[500] text-white rounded"
          >
            {selectedAlpha.name}
            <FontAwesomeIcon icon={faCaretDown} />
          </button>

          {openSort && (
            <div className="absolute left-0 mt-2 w-full md:w-[130px]  bg-[#000] text-white rounded shadow z-10">
              <ul className="p-[8px]">
                {alphaOptions.map((opt) => (
                  <li key={opt.value}>
                    <p
                      onClick={() => handleAlphaChange(opt)}
                      className="px-4 py-2 hover:underline cursor-pointer"
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

      <MovieInfoModal show={showModal} movie={selectedMovie} onClose={closeModal} />

      <div className="px-[15px] md:pl-[45px] pt-[75px]">
        <MovieCards
          title="Popular"
          category="popular"
          favorites={favorites}
          onAdd={(movie) =>
            setFavorites((prev) =>
              prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
            )
          }
          onRemove={(movie) =>
            setFavorites((prev) => prev.filter((m) => m.id !== movie.id))
          }
          onOpenModal={openModal}
        />
      </div>

      <Footer />
    </div>
  );
};

export default OriginalAudio;
