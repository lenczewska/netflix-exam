import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// эмуляция __dirname в ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// пути к файлам
const inputPath = path.resolve(__dirname, "public/games.with-genres.json");
const outputPath = path.resolve(__dirname, "public/games.with-genres.updated.json");

// читаем JSON
const raw = fs.readFileSync(inputPath, "utf-8");
const data = JSON.parse(raw);

// хелпер для аккуратных значений
const safe = (v, fallback) => {
  if (!v || (Array.isArray(v) && v.length === 0)) return fallback;
  return v;
};

// массивы для рандомизации
const years = [2022, 2023, 2024, 2025];
const modesOptions = ["Singleplayer", "Multiplayer", "Co-op", "Singleplayer / Multiplayer"];
const playerOptions = ["1", "1–2", "1–4", "2–8"];
const languagesOptions = [
  ["English"],
  ["English", "Spanish"],
  ["English", "French", "German"],
  ["English", "Japanese"],
  ["English", "Russian", "Turkish"],
];
const developerOptions = [
  "Netflix Games",
  "Indie Studio",
  "Arcade Devs",
  "PixelWorks",
  "DreamForge",
  "GameLab",
];
const maturityOptions = ["All", "Teen", "Mature", "18+"];
const yesNoOptions = ["Yes", "No"]; // для Play Offline и Supports Controllers

// обновляем игры
const updatedGames = data.games.map((game) => ({
  ...game,
  category: safe(game.genres?.[0], "N/A"),
  modes: modesOptions[Math.floor(Math.random() * modesOptions.length)], // 🎲 случайный режим
  player: playerOptions[Math.floor(Math.random() * playerOptions.length)], // 🎲 случайное число игроков
  availableOn: safe(game.platform, "N/A"),
  playOffline: yesNoOptions[Math.floor(Math.random() * yesNoOptions.length)], // 🎲 случайно Yes/No
  supportsControllers: yesNoOptions[Math.floor(Math.random() * yesNoOptions.length)], // 🎲 случайно Yes/No
  languages: languagesOptions[Math.floor(Math.random() * languagesOptions.length)], // 🎲 случайные языки
  developer: developerOptions[Math.floor(Math.random() * developerOptions.length)], // 🎲 случайный разработчик
  releaseYear: years[Math.floor(Math.random() * years.length)], // 🎲 случайный год
  maturityRating: game.contentRating || maturityOptions[Math.floor(Math.random() * maturityOptions.length)], // 🎲 случайный рейтинг
}));

// сохраняем
fs.writeFileSync(
  outputPath,
  JSON.stringify({ games: updatedGames }, null, 2),
  "utf-8"
);

console.log("✅ JSON обновлён и сохранён в public/games.with-genres.updated.json");
