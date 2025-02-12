const request = require("supertest");
const { Genre } = require("../../models/genre");
const jsonDataGenre = require("./library.genres.json");

let server = null;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(() => {
    server.close();
  });
  
  const teste = JSON.parse(jsonDataGenre);
  console.log(teste.count);

  describe("GET /", () => {
    it("should return all genres", async () => {
      

      
      //console.log(JSON.parse(jsonDataGenre).name);
      
      // Genre.collection.insertMany(
      //   JSON.parse(jsonDataGenre).name()
      // );

      // const res = await request(server).get("/api/genres");
      // expect(res.status).toBe(200);
    });
  });
});
