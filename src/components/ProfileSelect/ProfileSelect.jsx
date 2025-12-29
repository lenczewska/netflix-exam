import React from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from "../../assets/img/avatar1.png";
import avatar2 from "../../assets/img/avatar2.png";
import avatar4 from "../../assets/img/avatar4.png";
import avatar5 from "../../assets/img/avatar5.jpg";

const profiles = [
  { id: 1, name: "Ariadna", avatar: avatar1 },
  { id: 2, name: "User1", avatar: avatar2 },
  { id: 4, name: "User2", avatar: avatar4 },
  { id: 5, name: "Guest", avatar: avatar5 },
];

const ProfileSelect = () => {
  const navigate = useNavigate();
  navigate("/browse");

  const handleSelect = (profile) => {
    localStorage.setItem("selectedProfile", JSON.stringify(profile));
    navigate("/browse");
  };

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl md:text-4xl font-[400px] mb-8">
        Who's watching?
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[40px] ">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleSelect(profile)}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-200"
          >
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-36 h-36 md:w-40 md:h-40 rounded-lg border-4 border-transparent hover:border-white"
            />
            <span className="mt-4 text-lg md:text-xl font-semibold">
              {profile.name}
            </span>
          </div>
        ))}
      </div>

      <button
        className="mt-[40px] border p-[10px] text-gray-400 hover:text-white transition"
        onClick={() => alert("Управление профилями")}
      >
        Manage Profiles
      </button>
    </div>
  );
};

export default ProfileSelect;
