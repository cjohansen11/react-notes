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

    it("GET /user/:email should return the correct user", (done) => {
      supertest(API_ROOT)
        .get(`/user/${user.email}`)
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
    const user = { email: "note_test@test.com" };
    let userId = "";
    let noteId = "";

    before((done) => {
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

    it("POST /note", (done) => {
      supertest(API_ROOT)
        .post("/note")
        .send({
          note,
          email: user.email,
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

          const responseNote = {
            note: res.body.data.note,
            title: res.body.data.title,
            id: res.body.data.id,
            userId: res.body.data.userId,
          };

          expect(responseNote).to.deep.equal({ ...note, userId, id: noteId });
          done();
        });
    });

    it("PUT /note/:noteId", (done) => {
      const updatedNote = { title: "World Hello", note: "Testing PUT /note" };
      supertest(API_ROOT)
        .put(`/note/${noteId}`)
        .send(updatedNote)
        .expect(202)
        .then(() => {
          supertest(API_ROOT)
            .get(`/note/${noteId}`)
            .expect(200)
            .end((err, res) => {
              if (err) throw err;

              const responseNote = {
                note: res.body.data.note,
                title: res.body.data.title,
                id: res.body.data.id,
                userId: res.body.data.userId,
              };

              expect(responseNote).to.deep.equal({
                ...updatedNote,
                userId,
                id: noteId,
              });
              done();
            });
        });
    });

    it("DELETE /note/:noteId", (done) => {
      supertest(API_ROOT).delete(`/note/${noteId}`).expect(204, done);
    });

    it("GET /note/list/:userId", async () => {
      await supertest(API_ROOT)
        .post(`/note`)
        .send({
          note: { title: "Note 1", note: "This is the first" },
          email: user.email,
        })
        .expect(201);
      await supertest(API_ROOT)
        .post(`/note`)
        .send({
          note: { title: "Note 2", note: "This is the second" },
          email: user.email,
        })
        .expect(201);

      const getRes = await supertest(API_ROOT)
        .get(`/note/list/${userId}`)
        .expect(200);

      expect(getRes.body.data.length).to.equal(2);
    });

    it("GET /note/list/:userId filter query", async () => {
      const getRes = await supertest(API_ROOT)
        .get(`/note/list/${userId}?query=second`)
        .expect(200);

      expect(getRes.body.data[0].note).to.equal("This is the second");
    });

    it("GET /note/list/:userId orderBy Oldest", async () => {
      const getRes = await supertest(API_ROOT)
        .get(`/note/list/${userId}?orderBy=oldest`)
        .expect(200);

      expect(new Date(getRes.body.data[0].createDate)).to.be.lessThan(
        new Date(getRes.body.data[1].createDate)
      );
    });

    it("GET /note/list/:userId orderBy Newest", async () => {
      const getRes = await supertest(API_ROOT)
        .get(`/note/list/${userId}?orderBy=newest`)
        .expect(200);

      expect(new Date(getRes.body.data[0].createDate)).to.be.greaterThan(
        new Date(getRes.body.data[1].createDate)
      );
    });

    it("GET /note/list/:userId orderBy recentlyUpdated", async () => {
      const getRes = await supertest(API_ROOT)
        .get(`/note/list/${userId}?orderBy=recentlyUpdated`)
        .expect(200);

      expect(new Date(getRes.body.data[0].updateDate)).to.be.greaterThan(
        new Date(getRes.body.data[1].updateDate)
      );
    });

    after(async () => {
      await supertest(API_ROOT).delete(`/user/${userId}`).expect(204);
    });
  });
});
