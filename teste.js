const jsonDataGenre = require("./tests/integration/library.genres.json");

const data = JSON.parse(JSON.stringify(jsonDataGenre));
console.log(data.name);
      
