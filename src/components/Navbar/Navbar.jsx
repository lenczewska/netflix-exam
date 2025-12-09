import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../fireBase";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import logo_header from "../../assets/img/logo_header.png";
import profile_icon from "../../assets/img/profile_icon.jpg";

const Navbar = () => {
  const navRef = useRef();
  const searchRef = useRef(); // 🔹 реф для блока поиска
  const navigate = useNavigate();
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  // эффект для изменения стиля при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current?.classList.add("nav-dark");
      } else {
        navRef.current?.classList.remove("nav-dark");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 закрытие поиска при клике вне блока и по Escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div
      ref={navRef}
      className="w-screen pt-[20px] pb-[10px] fixed flex items-center justify-between pl-[40px] text-[13px] pr-[40px] text-[#e5e5e5] z-30"
    >
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="navbar-left flex gap-[5px] items-center justify-center">
        <img
          onClick={() => navigate("/browse")}
          src={logo_header}
          alt="logo-header"
          className="w-[100px] mr-[30px] cursor-pointer"
        />
        <ul className="flex gap-[20px]">
          <li
            onClick={() => navigate("/browse")}
            className={
              location.pathname === "/browse" ? "font-[650]" : "text-[13px]"
            }
          >
            Home
          </li>
          <li
            onClick={() => navigate("/shows")}
            className={
              location.pathname === "/shows" ? "font-[650]" : "text-[13px]"
            }
          >
            Shows
          </li>
          <li
            onClick={() => navigate("/movies")}
            className={
              location.pathname === "/movies" ? "font-[650]" : "text-[13px]"
            }
          >
            Movies
          </li>
          <li
            onClick={() => navigate("/games")}
            className={
              location.pathname === "/games" ? "font-[650]" : "text-[13px]"
            }
          >
            Games
          </li>
          <li
            onClick={() => navigate("/latest")}
            className={
              location.pathname === "/latest" ? "font-[650]" : "text-[13px]"
            }
          >
            Latest
          </li>
          <li
            onClick={() => navigate("/my-list")}
            className={
              location.pathname === "/my-list" ? "font-[650]" : "text-[13px]"
            }
          >
            My List
          </li>
          <li
            onClick={() => navigate("/original-audio")}
            className={
              location.pathname === "/original-audio"
                ? "font-[650]"
                : "text-[13px]"
            }
          >
            Browse by Languages
          </li>
        </ul>
      </div>

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="navbar-right flex gap-[15px] items-center">
        {/* КНОПКА ПОИСКА */}
        <button
          className="bg-black search-btn text-[#aaa] cursor-pointer"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            role="img"
          >
            <path
              fill="white"
              fillRule="evenodd"
              d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {/* ПОЛЕ ПОИСКА */}
        {searchOpen && (
          <div
            ref={searchRef}
            className="bg-white rounded shadow-lg flex items-center relative"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Titles,people,genres"
              className="border border-gray-300 rounded w-[230px] pl-[10px] h-[30px] bg-[#000] text-[#fff]"
            />
            {query.length > 0 && (
              <button
                onClick={() => setQuery("")}
                className="btn ml-[2px] text-[#fff] absolute right-[10px] cursor-pointer font-bold"
              >
                ✕
              </button>
            )}
          </div>
        )}

        {/* ИКОНКА УВЕДОМЛЕНИЙ */}
        <svg
          className="cursor-pointer"
          viewBox="0 0 24 24"
          width="23"
          height="22"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37"
            clipRule="evenodd"
          ></path>
        </svg>

        {/* ПРОФИЛЬ */}
        <div className="acc-box relative flex items-center cursor-pointer">
          <img
            src={profile_icon}
            alt=""
            className="profile w-[30px] rounded-[5px]"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className="down text-white text-[15px] ml-[5px]"
          />

          <div className="acc-box relative">
            <div className="dropdownMenu border flex flex-col gap-[25px] z-10 rounded-[2px] pb-[18px] pl-[22px] pt-[18px] mt-[30px] pr-[22px] bg-[#191919]">
              <p className="hover:underline">
                <FontAwesomeIcon className="mr-[10px]" icon={faPen} /> Manage
                Profiles
              </p>
              <p className="hover:underline">
                <FontAwesomeIcon className="mr-[10px]" icon={faFaceLaughWink} />{" "}
                Transfer Profile
              </p>
              <p className="hover:underline">
                <FontAwesomeIcon className="mr-[10px]" icon={faUser} /> Account
              </p>
              <p className="hover:underline">
                <FontAwesomeIcon
                  className="mr-[10px]"
                  icon={faCircleQuestion}
                />{" "}
                Help center
              </p>
              <p
                onClick={() => logout()}
                className="mt-[20px] p-[15px] text-[13px] hover:underline border-t"
              >
                Sign Out of Netflix
              </p>
            </div>
            <FontAwesomeIcon
              icon={faCaretUp}
              className="up absolute text-white text-[20px] -left-[32px] -translate-x-[18px] top-[18px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
