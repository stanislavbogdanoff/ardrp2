const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");

// Import your Express app
const app = require("../server.ts"); // Replace with your app file

describe("Wallet Routes Tests", () => {
  let walletId; // Store the wallet ID for use in other tests

  it("should create a new wallet", (done) => {
    request(app)
      .post("/api/wallets")
      .send({ address: "NewWalletAddress", status: "Available" }) // Modify data as needed
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        walletId = res.body._id; // Store the wallet ID
        done();
      });
  });

  it("should get all wallets", (done) => {
    request(app)
      .get("/api/wallets")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        expect(res.body.length).to.be.greaterThan(0);
        done();
      });
  });

  it("should check if a wallet exists", (done) => {
    request(app)
      .post("/api/wallets/check")
      .send({ wallet_address: "NewWalletAddress" }) // Modify the address to match the created wallet
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.a("boolean");
        expect(res.body).to.equal(true);
        done();
      });
  });

  it("should get available wallets", (done) => {
    request(app)
      .get("/api/wallets/available")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should get a random wallet", (done) => {
    request(app)
      .get("/api/wallets/random")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal("Taken");
        done();
      });
  });

  it("should add a project to a wallet", (done) => {
    request(app)
      .patch(`/api/wallets/${walletId}/add-project`)
      .send({ projects: ["Project1", "Project2"] }) // Modify projects as needed
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.projects).to.include.members(["Project1", "Project2"]);
        done();
      });
  });

  it("should remove a wallet", (done) => {
    request(app)
      .delete(`/api/wallets/${walletId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.status).to.equal("Taken");
        done();
      });
  });

  it("should fail to remove a wallet with an invalid wallet ID", (done) => {
    request(app)
      .delete("/api/wallets/invalid_wallet_id")
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("object");
        expect(res.body.error).to.equal("Invalid wallet id");
        done();
      });
  });
});
