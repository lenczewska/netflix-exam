import fs from "fs";

// читаем JSON
const data = JSON.parse(await fs.promises.readFile("./public/games.with-genres.json", "utf8"));

// переписываем id по порядку
data.games = data.games.map((game, index) => ({
  ...game,
  id: index + 1
}));

// сохраняем обратно
await fs.promises.writeFile("./public/games.with-genres.json", JSON.stringify(data, null, 2), "utf8");

console.log("✅ ID обновлены по порядку!");
