import fs from "fs";

const raw = fs.readFileSync("./public/games.with-genres.updated.json", "utf-8");
const data = JSON.parse(raw);

data.games = data.games.map(game => {
  let desc = "";
  if (game.genres.includes("Party")) {
    desc = `${game.title} is a fun party game full of mini-games and laughter with friends.`;
  } else if (game.genres.includes("Puzzle")) {
    desc = `${game.title} challenges your mind with clever puzzles and logic-based gameplay.`;
  } else {
    desc = `${game.title} is a unique game in the ${game.category} genre.`;
  }
  return { ...game, description: desc };
});

fs.writeFileSync("./public/games.with-descriptions.json", JSON.stringify(data, null, 2));
console.log("Descriptions added successfully!");
