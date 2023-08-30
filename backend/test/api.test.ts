import supertest from "supertest";
import { describe, it } from "mocha";
import { expect } from "chai";

const API_ROOT = "http://localhost:3001";

describe(`API testing`, () => {
  describe("Health route", () => {
    it("GET /health should return 200 status code", (done) => {
      supertest(API_ROOT).get("/health").expect(200, done);
    });
  });

  describe("User routes", () => {
    const user = { email: "test@test.com" };
    let userId = "";

    it("POST /user should be created and return a 201 status code", (done) => {
      supertest(API_ROOT)
        .post("/user")
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          userId = res.body.data.id;
          done();
        });
    });
    it("GET /user/:userId should return the correct user", (done) => {
      supertest(API_ROOT)
        .get(`/user/${userId}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data).to.deep.equal({
            id: userId,
            email: user.email,
          });
          done();
        });
    });
    it("DELETE /user/:userId should delete the user and return a 204 status code", (done) => {
      supertest(API_ROOT).delete(`/user/${userId}`).expect(204, done);
    });
    it("GET /user/:userId should fail to fetch deleted userId", (done) => {
      supertest(API_ROOT).get(`/user/${userId}`).expect(500, done);
    });
  });
});
