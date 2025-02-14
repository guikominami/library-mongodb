const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");

const jsonDataGenre = require("./library.genres.json");
const { before } = require("lodash");

let server = null;

describe("/api/genres", () => {
  beforeEach(async () => {
    server = require("../../index");
    await Genre.deleteMany({});
  });
  afterEach(() => {
    server.close();
  });

  //Para inserir dados na base
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
      const genre = new Genre({ name: "genre teste" });
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

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if genre is less than 5 characters", async () => {
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();
      //400 erro no corpo da mensagem
      expect(res.status).toBe(400);
    });

    it("should save the genre if is valid", async () => {
      await exec();

      const genre = await Genre.find({ name });

      //400 erro no corpo da mensagem
      expect(genre).not.toBeNull();
    });

    it("should return the genre if is valid", async () => {
      const res = await exec();

      //400 erro no corpo da mensagem
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", name);
    });
  });
});
