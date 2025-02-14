const request = require("supertest");

describe("auth middleware", () => {
  beforeEach(async () => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
  });
  
  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre 1" });
    
  }
  
  it ("should return 401 if no token is provided", () => {
    await exec();
  })
})