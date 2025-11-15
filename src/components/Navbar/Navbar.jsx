import "./Navbar.css";
import logo_header from "../../assets/img/logo_header.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

import profile_icon from "../../assets/img/profile_icon.jpg";

const Navbar = () => {
  return (
    <div className="navbar w-full pt-[20px] flex items-center justify-between pl-[40px] text-[13px] pr-[40px]  text-[#e5e5e5] z-30 absolute ">
      <div className="navbar-left  flex gap-[5px]  items-center justify-center ">
        <img
          src={logo_header}
          alt="logo-header"
          className="w-[100px] mr-[30px] cursor-pointer "
        />
        <ul className=" flex gap-[20px] ">
          <li>Home</li>
          <li>Shows</li>
          <li>Movies</li>
          <li>Games</li>
          <li>Latest</li>
          <li className="">My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      <div className="navbar-right flex gap-[20px] items-center ">
        <button className="bg-black text-[#aaa] cursor-pointer ">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            data-icon="MagnifyingGlassMedium"
            data-icon-id=":rc:"
            aria-hidden="true"
            class="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            role="img"
          >
            <path
              fill="white"
              fill-rule="evenodd"
              d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <svg
          className="cursor-pointer"
          viewBox="0 0 24 24"
          width="23"
          height="22"
          data-icon="BellMedium"
          data-icon-id=":rd:"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          role="img"
        >
          <path
            className=""
            fill="currentColor"
            fill-rule="evenodd"
            d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37"
            clip-rule="evenodd"
          ></path>
        </svg>
        <div className="acc-box relative flex items-center cursor-pointer">
          <img
            src={profile_icon}
            alt=""
            className="profile w-[30px]  rounded-[5px]"
          />
          <FontAwesomeIcon
            icon={faCaretDown}
            className=" down text-white text-[15px] ml-[5px]"
          />

          <div className="relative">
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
              <p className="mt-[20px] p-[15px] text-[13px] hover:underline border-t">
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
