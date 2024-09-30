const { writeFileSync, readFileSync, existsSync } = require("node:fs");
const archivo = "./db/data.json";

const guardarDB = (data) => {
  writeFileSync(archivo, JSON.stringify(data));
};

const leerDB = () => {
  if (!existsSync(archivo)) {
    return null;
  }

  const info = readFileSync(archivo, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

module.exports = { guardarDB, leerDB };
