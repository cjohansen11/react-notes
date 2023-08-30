const supertest = require("supertest");

const API_ROOT = "http://localhost:3001";

describe(`API testing`, () => {
  it("Health should return 200 status code", (done) => {
    supertest(API_ROOT).get("/health").expect(200, done);
  });
});
