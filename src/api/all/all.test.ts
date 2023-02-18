import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";

describe("GET /api/all", () => {
  it("Bad Request - nums undefined", async () =>
    request(app)
      .get("/api/all?nums")
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
    // delete the results.txt content
    // get all route with save equals false
    // read file and check its length is still zero

    // could install a supertest promises package to help with the nesting

    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        request(app)
          .get("/api/all?nums=2,2,5&save=false")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual([
              "The mean of 2,2,5 is 3.",
              "The median of 2,2,5 is 2.",
              "The mode of 2,2,5 is 2.",
            ]);

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).toStrictEqual("");
          });

        return done();
      });
  });

  it("Check you get mean, mode and median", async () =>
    request(app)
      .get("/api/all?nums=2,2,5")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual([
          "The mean of 2,2,5 is 3.",
          "The median of 2,2,5 is 2.",
          "The mode of 2,2,5 is 2.",
        ]);
      }));

  it("save with different value", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        request(app)
          .get("/api/all?nums=11,12,25&save=fal")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual([
              "The mean of 11,12,25 is 16.",
              "The median of 11,12,25 is 12.",
              "The mode of 11,12,25 is 11."
            ]);

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).toContain("The mean of 11,12,25 is 16.");
            expect(results).toContain("The median of 11,12,25 is 12.");
            expect(results).toContain("The mode of 11,12,25 is 11.");
          });

        return done();
      });
  });
});
