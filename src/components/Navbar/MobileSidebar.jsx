import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import profile_icon from "../../assets/img/profile_icon.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faFaceLaughWink } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="p-2">
        <Menu />
      </SheetTrigger>

      <SheetContent side="left" className="w-[300px] bg-[#000] flex items-center flex-col ">
        <img
          src={profile_icon}
          alt=""
          className="profile  w-[40px] pb-[20px] rounded-[5px]"
        />
        <nav className="flex flex-col items-center gap-4 border-b-2 ">
          <a href="/">Home</a>
          <a href="/shows">Shows</a>
          <a href="/movies">Movies</a>
          <a href="/games">Games</a>
          <a href="/latest">Latest</a>
          <a href="/my-list">My List</a>
          <a href="/original-audio">Browse by Languages</a>
        </nav>

        <div className="acc-box  ">
          <div className="dropdown border flex flex-col gap-[25px] z-10 rounded-[2px] pb-[18px] pl-[22px] pt-[18px] mt-[30px] pr-[22px] bg-[#191919]">
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
              <FontAwesomeIcon className="mr-[10px]" icon={faCircleQuestion} />{" "}
              Help center
            </p>
            <p
              onClick={() => logout()}
              className="mt-[20px] p-[15px] text-[13px] hover:underline border-t"
            >
              Sign Out of Netflix
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
