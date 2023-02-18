import request from "supertest";

import app from "../../app";

describe("GET /api/items", () => {
  it("Returns items", async () =>
    request(app)
      .get("/api/items")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual([
          {
            id: "1",
            name: "TV",
            price: 500,
            description: "LG 55",
          },
        ]);
      }));

  it("Get /:id", function (done) {
    request(app)
      .get("/api/items/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);

        expect(response.body).toStrictEqual({
          id: "1",
          name: "TV",
          price: 500,
          description: "LG 55",
        });

        return done();
      });
  });

  it("Incomplete Post", function (done) {
    request(app)
      .post("/api/items")
      .send({
        name: "Test item name",
        description: "Test item description",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).toStrictEqual({
          status: 400,
          message: "Name and price are required.",
        });
      });
    return done();
  });

  it("Post", function (done) {
    request(app)
      .post("/api/items")
      .send({
        name: "Test item name",
        price: 100,
        description: "Test item description",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).toHaveLength(2);
        return done();
      });
  });

  it("Post without description", function (done) {
    request(app)
      .post("/api/items")
      .send({
        name: "Test item name 2",
        price: 100,
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, response) {
        if (err) return done(err);

        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              name: "Test item name 2",
            }),
          ])
        );

        return done();
      });
  });

  it("Put with non-registered id", function (done) {
    request(app)
      .put("/api/items")
      .send({
        id: "1222",
        name: "TV",
        price: 600,
        description: "LG 55",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).toStrictEqual({
          status: 400,
          message: "Item ID 1222 not found",
        });
        return done();
      });
  });

  it("Put", function (done) {
    request(app)
      .put("/api/items")
      .send({
        id: "1",
        name: "TV",
        price: 600,
        description: "LG 55",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);

        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: "1",
              name: "TV",
              price: 600,
              description: "LG 55",
            }),
          ])
        );

        return done();
      });
  });

  it("Get /:id with non-registered id", function (done) {
    request(app)
      .get("/api/items/1222")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).toStrictEqual({
          status: 400,
          message: `Item ID 1222 not found`,
        });
        return done();
      });
  });

  it("Delete with non-registered id", function (done) {
    request(app)
      .delete("/api/items")
      .send({
        id: "1222",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, response) {
        if (err) return done(err);
        expect(response.body).toStrictEqual({
          status: 400,
          message: `Item ID 1222 not found`,
        });
        return done();
      });
  });

  it("Delete", function (done) {
    request(app)
      .delete("/api/items")
      .send({
        id: "1",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);

        expect(response.body).not.toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: "1",
              name: "TV",
              price: 600,
              description: "LG 55",
            }),
          ])
        );

        return done();
      });
  });
});
