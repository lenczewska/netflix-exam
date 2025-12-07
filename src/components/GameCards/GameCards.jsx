import { useEffect, useState } from "react";
import "./GameCards.css";

function GameCards({ title, genres, onGameClick }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("/games.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = genres
          ? data.games.filter((game) => {
              if (game.genres && game.genres.includes(genres)) return true;
              if (!game.genres || game.genres.includes("Unknown")) return true;
              return false;
            })
          : data.games;

        setGames(filtered);
      });
  }, [genres]);

  return (
    <>
      <h2 className="mb-[10px] text-[24px] font-[500]">{title}</h2>

      <div className="flex flex-wrap gap-[15px]  ">
        <div className="card-list overflow-x-scroll flex gap-[10px]">
          {games.map((game) => (
            <div key={game.id} className="flex flex-col items-center">
              <div
                className="w-[160px] h-[160px] bg-white rounded-[20px] shadow-md overflow-hidden border border-gray-200 cursor-pointer"
                onClick={() => onGameClick(game)} // <<< здесь
              >
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
    </>
  );
}

export default GameCards;
