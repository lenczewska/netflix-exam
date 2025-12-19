import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TitleCards from "../../components/TitleCards/TitleCards";
import MovieInfoModal from "../../components/Modal/MovieInfoModal";

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
    if (showModal) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [showModal]);

  const handleAddFavorite = () => {
    if (!randomShow) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === randomShow.id);
      if (exists) return prev;
      return [...prev, randomShow];
    });
  };

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
  }, [selectedOriginal, selectedLanguage, selectedAlpha]);

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
      if (
        originalRef.current &&
        !originalRef.current.contains(event.target) &&
        englishRef.current &&
        !englishRef.current.contains(event.target) &&
        sortRef.current &&
        !sortRef.current.contains(event.target)
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

      <p className="pl-[45px] text-[27px] pt-[100px] pb-[20px] ">
        Browse by Languages
      </p>

      <div className="sorting-box flex items-center gap-[15px] pl-[45px] pt-[10px]">
        <p className="text-[14px]">Select Your Preferences</p>

        <div ref={originalRef} className="relative inline-block cursor-pointer">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenOriginal(!openOriginal);
            }}
            className="bg-[#000] cursor-pointer w-[190px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px]  font-[500] text-white rounded"
          >
            {selectedOriginal.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>
          {openOriginal && (
            <div
              className="absolute left-0 mt-2 w-[190px] bg-[#000] text-[#fff] shadow-lg rounded z-10 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="p-[8px]">
                {originalOptions.map((opt) => (
                  <li key={opt.value}>
                    <p
                      onClick={() => handleOriginalChange(opt)}
                      className="block pt-[5px] hover:underline cursor-pointer"
                    >
                      {opt.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div ref={englishRef} className="relative inline-block cursor-pointer">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenEnglish(!openEnglish);
            }}
            className="bg-[#000] w-[250px] cursor-pointer pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded"
          >
            {selectedLanguage.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>
          {openEnglish && (
            <div
              className="absolute left-0 mt-2 bg-[#000] w-[250px] text-[#fff] shadow-lg rounded z-50 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="p-[8px] max-h-[400px] overflow-y-auto">
                <li key="all">
                  <p
                    onClick={() =>
                      handleLanguageChange({
                        name: "All Languages",
                        code: "all",
                      })
                    }
                    className="block px-4 py-2 hover:bg-gray-700 hover:underline cursor-pointer"
                  >
                    All Languages
                  </p>
                </li>
                {englishOptions.map((opt) => (
                  <li key={opt.code}>
                    <p
                      onClick={() => handleLanguageChange(opt)}
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

        <p className="text-[14px]">Sort by</p>
        <div ref={sortRef} className="relative inline-block cursor-pointer">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenSort(!openSort);
            }}
            className="bg-[#000] w-[130px] pt-[5px] pb-[2px] flex justify-between items-center border px-[10px] text-[13px] font-[500] text-white rounded cursor-pointer"
          >
            {selectedAlpha.name}
            <FontAwesomeIcon icon={faCaretDown} className="text-white" />
          </button>
          {openSort && (
            <div
              className="absolute left-0 mt-2 w-[130px] bg-[#000] text-[#fff] shadow-lg rounded z-10 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="p-[8px]">
                {alphaOptions.map((opt) => (
                  <li key={opt.value}>
                    <p
                      onClick={() => handleAlphaChange(opt)}
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

      <MovieInfoModal
        show={showModal}
        movie={selectedMovie}
        onClose={closeModal}
      />

      <div className="pl-[45px] pt-[75px]">
        <TitleCards
          original={selectedOriginal.value}
          language={selectedLanguage.code}
          alpha={selectedAlpha.value}
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
