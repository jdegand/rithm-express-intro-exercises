import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";

describe("GET /api/mean", () => {
  it("Bad Request - nums undefined", async () =>
    request(app)
      .get("/api/mean")
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
      .end(function (err, res) {
        if (err) return done(err);

        request(app)
          .get("/api/mean?nums=2,2,5&save=false")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual({
              message: "The mean of 2,2,5 is 3.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).not.toContain("The mean of 2,2,5 is 3.");
          });

        return done();
      });
  });

  it("Mean with nums", async () => {
    request(app)
      .get("/api/mean?nums=2,2,5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          message: "The mean of 2,2,5 is 3.",
        });
      });
  });

  it("nums?=2,2,foo", async () =>
    request(app)
      .get("/api/mean?nums=2,2,foo")
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
          .get("/api/mean?nums=2,2,5&save=fal")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual({
              message: "The mean of 2,2,5 is 3.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).toContain("The mean of 2,2,5 is 3.");
          });

        return done();
      });
  });
});
