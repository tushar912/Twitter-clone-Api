const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha = require("mocha");
const server = require("../app.js");

const User = require("../models/user");
const Follows = require("../models/follows");
const Tweet = require("../models/tweet");

const should = chai.should();

chai.use(chaiHttp);

describe("User",()=>{
    before((done)=>{
        (async ()=>{
            await User.deleteMany({});
            await Tweet.deleteMany({});
            await Follows.deleteMany({});
            user._id = "58b56e80d9da29fa6ed60093";
            user.email = "tester1@gmail.com";
            user.password = "123456"
        })

    })

    describe("POST api/user/login",()=>{
        it("should log the user in",(done)=>{
            chai.request(server)
            .post("/api/user/login")
            .send({email: "tester1@gmail.com", password: "123456"})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.token.should.be.a("string");
                done();
        })
    })
    it("should not work without email",(done)=>{
        chai.request(server)
        .post("/api/user/login")
        .send({password: "123456"})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.eql("email not provided");
            done()
        })
    })
    it("should not work without password",(done)=>{
        chai.request(server)
        .post("/api/user/login")
        .send({email: "tester1@gmail.com"})
        .end((err, res) => {
            res.should.have.status(400);
            res.body.error.should.be.eql("email not provided");
            done()
        })
    })

})
})