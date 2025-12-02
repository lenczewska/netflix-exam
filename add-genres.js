import fs from "fs";

const INPUT = "./public/games.json"; 
const OUTPUT = "./public/games.with-genres.json";

const GENRE_MAP = [
  {
    genre: "Puzzle",
    keywords: ["tetris", "puzzle", "boggle", "word", "mahjong", "minesweeper"],
  },
  {
    genre: "Party",
    keywords: ["party", "pictionary", "heads up", "lego party"],
  },
  {
    genre: "Sports",
    keywords: [
      "football",
      "soccer",
      "basketball",
      "wwe",
      "sports",
      "bowling",
      "shooting hoops",
    ],
  },
  { genre: "Racing", keywords: ["asphalt", "rocket", "racing", "drift"] },
  {
    genre: "Simulation",
    keywords: [
      "simulator",
      "tycoon",
      "manager",
      "farming",
      "rollercoaster",
      "game dev",
    ],
  },
  { genre: "Fighting", keywords: ["street fighter", "tmnt", "combat"] },
  {
    genre: "Adventure",
    keywords: [
      "oxenfree",
      "kentucky route zero",
      "valiant hearts",
      "spiritfarer",
      "moonlighter",
      "terra nil",
    ],
  },
  { genre: "Platformer", keywords: ["sonic", "lucky luna", "cut the rope"] },
  { genre: "Strategy", keywords: ["bloons td", "into the breach", "townsmen"] },
  { genre: "Horror", keywords: ["black mirror", "ghost", "into the dead"] },
  {
    genre: "Kids",
    keywords: [
      "paw patrol",
      "peppa",
      "lego duplo",
      "barbie",
      "hello kitty",
      "spongebob",
      "toca boca",
    ],
  },
];

const normalize = (str = "") => str.toLowerCase();

const detectGenre = (title) => {
  const t = normalize(title);
  for (const { genre, keywords } of GENRE_MAP) {
    if (keywords.some((k) => t.includes(k))) {
      return genre;
    }
  }
  return "Unknown";
};

const raw = fs.readFileSync(INPUT, "utf-8");
const data = JSON.parse(raw);

const updated = data.games.map((game) => {
  if (game.genres && game.genres.length > 0) {
    return { ...game, genres: [game.genres[0]] };
  }
  const genre = detectGenre(game.title);
  return { ...game, genres: [genre] };
});

fs.writeFileSync(OUTPUT, JSON.stringify({ games: updated }, null, 2), "utf-8");
console.log("Genres added!");
