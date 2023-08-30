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

  describe("Note routes", () => {
    const note = { note: "Testing note creation", title: "Hello world" };
    let userId = "";
    let noteId = "";
    const noteIds: string[] = [];

    before((done) => {
      const user = { email: "tesdddt@test.com" };
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

    after((done) => {
      supertest(API_ROOT).delete(`/user/${userId}`).expect(204);

      for (const id of noteIds) {
        supertest(API_ROOT).delete(`/note/${id}`).expect(204);
      }
      done();
    });

    it("POST /note", (done) => {
      supertest(API_ROOT)
        .post("/note")
        .send({
          note,
          userId,
        })
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          noteId = res.body.data.id;
          done();
        });
    });

    it("GET /note/:noteId", (done) => {
      supertest(API_ROOT)
        .get(`/note/${noteId}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data).to.deep.equal({ ...note, userId, id: noteId });
          done();
        });
    });

    it("PUT /note/:noteId", (done) => {
      const updatedNote = { title: "World Hello", note: "Testing PUT /note" };
      supertest(API_ROOT).put(`/note/${noteId}`).send(updatedNote).expect(204);
      supertest(API_ROOT)
        .get(`/note/${noteId}`)
        .expect(204)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data).to.deep.equal({
            ...updatedNote,
            userId,
            id: noteId,
          });
          done();
        });
    });

    it("DELETE /note/:noteId", (done) => {
      supertest(API_ROOT).delete(`/note/${noteId}`).expect(204, done);
    });

    it("GET /note/:userId", (done) => {
      supertest(API_ROOT)
        .post(`/note`)
        .send({ note: { title: "Note 1", note: "This is the first" }, userId })
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          noteIds.push(res.body.data.id);
        });
      supertest(API_ROOT)
        .post(`/note`)
        .send({ note: { title: "Note 2", note: "This is the second" }, userId })
        .expect(201)
        .end((err, res) => {
          if (err) throw err;
          noteIds.push(res.body.data.id);
        });
      supertest(API_ROOT)
        .get(`/note/${userId}`)
        .expect(200)
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.data.length).to.equal(2);
          done();
        });
    });
  });
});
