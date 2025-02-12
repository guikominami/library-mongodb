const request = require("supertest");
const { Genre } = require("../../models/genre");
const jsonDataGenre = require("./library.genres.json");

let server = null;

describe("/api/genres", () => {
  beforeEach(async () => {
    server = require("../../index");
    await Genre.deleteMany({});
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      Genre.collection.insertMany(jsonDataGenre);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(17);
    });
  });
  
  describe("GET /:id", () => {
    it("should return a genre if valid id is passed", async () => {
      const genre = new Genre({ name: "genre teste" })
      await genre.save();
      
      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });
  });
  
  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");
      expect(res.status).toBe(404);
    });
  });
});
