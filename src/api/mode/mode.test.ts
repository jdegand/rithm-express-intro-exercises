import request from "supertest";
import fs from "fs";
import path from "path";

import app from "../../app";

describe("GET /api/mode", () => {

  it("Bad Request - nums undefined", () => {
    request(app)
      .get("/api/mode")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .then((response) => {
        expect(response.body).toStrictEqual({
          status: 400,
          message: "nums are required.",
        });
      });
  });

  it("&save=false works", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        request(app)
          .get("/api/mode?nums=100,100,200&save=false")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body).toStrictEqual({
              message: "The mode of 100,100,200 is 100.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf-8"
            );

            expect(results).not.toContain("The mode of 100,100,200 is 100.");
          });

        return done();
      });
  });

  it("mode with nums", (done) => {
    request(app)
      .delete("/api/results")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, response) {
        if (err) return done(err);

        request(app)
          .get("/api/mode?nums=7,7,8")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            
            expect(response.body).toStrictEqual({
              message: "The mode of 7,7,8 is 7.",
            });

            const results = fs.readFileSync(
              path.join(__dirname, "..", "results.txt"),
              "utf8"
            );

            expect(results).toContain("The mode of 7,7,8 is 7.");
            return done();
          });

      });
  });

  it("nums?=2,2,foo", async () =>
    request(app)
      .get("/api/mode?nums=2,2,foo")
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
              .get("/api/mode?nums=1,1,2&save=fal")
              .set("Accept", "application/json")
              .expect("Content-Type", /json/)
              .expect(200)
              .then((response) => {
                expect(response.body).toStrictEqual({
                  message: "The mode of 1,1,2 is 1.",
                });
    
                const results = fs.readFileSync(
                  path.join(__dirname, "..", "results.txt"),
                  "utf-8"
                );
    
                expect(results).toContain("The mode of 1,1,2 is 1.");
              });
    
            return done();
          });
      });
});
