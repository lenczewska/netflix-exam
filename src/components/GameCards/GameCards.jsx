import React, { useEffect, useState } from "react";

function GameCards({ title }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.with-genres.json")
      .then((res) => res.json())
      .then((data) => setGames(data.games));
  }, []);

  return (
    <div className="flex flex-wrap gap-[15px] ">
      <h2 className="mb-[10px] text-[24px] font-[500] ">{title}</h2>
      <div className="card-list overflow-x-scroll flex gap-[10px]">
        {games.map((game) => (
          <div key={game.id} className="flex flex-col  items-center">
            <div className="w-[160px] h-[160px] bg-white rounded-[20px] shadow-md overflow-hidden border border-gray-200 cursor-pointer">
              <img
                src={game.images.cover}
                alt={game.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="w-[100px] break-words whitespace-normal mt-[2px] font-semibold text-gray-800 text-center">
              {game.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameCards;
