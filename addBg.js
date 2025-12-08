import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// читаем JSON из public
const gamesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "public/games.json"), "utf8")
);

// если JSON — массив
const source = Array.isArray(gamesData) ? gamesData : gamesData.games;

const updatedGames = source.map((game) => {
  const slug = game.title.toLowerCase().replace(/\s+/g, "_");
  return {
    ...game,
    background: `/assets/backgrounds/${slug}_bg.jpg`
  };
});

// если исходный JSON был объектом с ключом games — сохраняем так же
const result = Array.isArray(gamesData)
  ? updatedGames
  : { ...gamesData, games: updatedGames };

fs.writeFileSync(
  path.join(__dirname, "public/games.json"),
  JSON.stringify(result, null, 2),
  "utf8"
);

console.log("✅ Ключ background добавлен во все игры");
