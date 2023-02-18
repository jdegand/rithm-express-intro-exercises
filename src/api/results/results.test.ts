import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";

describe("GET /api/results", () => {
  it("Get results when none exist", function (done) {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        expect(response.body).toStrictEqual({
          status: 200,
          message: "Results cleared.",
        });

        const results = fs.readFileSync(
          path.join(__dirname, "..", "results.txt"),
          "utf-8"
        );

        request(app)
          .get("/api/results")
          .expect("Content-Type", /json/)
          .then((response) => {
            expect(response.body).toStrictEqual({
              status: 404,
              message: "There are no results yet.",
            });

            done();
          });
      });
  });

  it("Delete response and file length", function (done) {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 200,
          message: "Results cleared.",
        });

        const results = fs.readFileSync(
          path.join(__dirname, "..", "results.txt"),
          "utf-8"
        );

        expect(results).toHaveLength(0);
        done();
      });
  });

  it("Results with mean", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 200,
          message: "Results cleared.",
        });

        const results = fs.readFileSync(
          path.join(__dirname, "..", "results.txt"),
          "utf-8"
        );

        request(app)
          .get("/api/mean?nums=2,2,5")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual({
              message: "The mean of 2,2,5 is 3.",
            });

            request(app)
              .get("/api/results")
              .expect("Content-Type", /json/)
              .expect(200)
              .then((response) => {
                expect(response.body).toStrictEqual([
                  "The mean of 2,2,5 is 3.",
                ]);
                done();
              });
          });
      });
  });
});
