import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";

describe("GET /api/median", () => {
  it("Bad Request - nums undefined", async () =>
    request(app)
      .get("/api/median")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 400,
          message: "nums are required.",
        });
      }));

  it("&save=false works", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        request(app)
          .get("/api/median?nums=10,11,12&save=false")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).toStrictEqual({
              message: "The median of 10,11,12 is 11.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).not.toContain("The median of 10,11,12 is 11.");
          });

        return done();
      });
  });

  it("median with nums", async () => {
    request(app)
      .get("/api/median?nums=2,2,5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          message: "The median of 2,2,5 is 2.",
        });
      });
  });

  it("median that requires halving", async () => {
    request(app)
      .get("/api/median?nums=2,2,4,5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          message: "The median of 2,2,4,5 is 3.",
        });
      });
  });

  it("nums?=2,2,foo", async () =>
    request(app)
      .get("/api/median?nums=2,2,foo")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 400,
          message: "foo is not a number.",
        });
      }));

  it("save with different value", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        request(app)
          .get("/api/median?nums=20,21,25&save=fal")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual({
              message: "The median of 20,21,25 is 21.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).toStrictEqual("The median of 20,21,25 is 21.\n");
          });

        return done();
      });
  });
});
