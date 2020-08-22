const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha = require("mocha");
const server = require("../index.js");

const User = require("../models/user");
const Follows = require("../models/follows");
const Tweet = require("../models/tweet");

const should = chai.should();

chai.use(chaiHttp);

describe("User",()=>{
    before((done)=>{
        User.deleteMany({}).then(()=>{
            return Follows.deleteMany();
        }).then(()=>{
            return Tweet.deleteMany();
        }).then(()=>{
            User.register(new User({username:"tushaar",email:"tester1@gmail.com"}), 
            "123456")
        }).then(()=>{
            done()
        }).catch((err)=>done(err))
       

    })

    describe("POST api/user/login",()=>{
        it("should log the user in",(done)=>{
            chai.request(server)
            .post("/api/user/login")
            .send({username:"tushaar",password: "123456"})
            .end((err, res) => {
                console.log(err);
                res.should.have.status(200);
                
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
            
            done()
        })
    })
    it("should not work without password",(done)=>{
        chai.request(server)
        .post("/api/user/login")
        .send({email: "tester1@gmail.com"})
        .end((err, res) => {
            res.should.have.status(400);
            
            done()
        })
    })
    it("should not log the user in with a wrong password", (done) => {
        chai.request(server)
        .post("/api/user/login")
        .send({email: "tester1@gmail.com", password: "12"})
        .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(400);
           
            done();
        });
    });

})
describe("POST api/user/signup",()=>{
    it("should let the user register an account", (done) => {
        chai.request(server)
        .post("/api/user/signup")
        .send({ email: "tester2@gmail.com", password: "548367432",username:"tush" })
        .end((err, res) => {
            should.exist(res.body);
            res.should.have.status(200);
            res.should.be.json;
            
            User.findOne({email: "tester2@gmail.com"}).then((savedUser)=>{
                savedUser.email.should.be.equal("tester2@gmail.com");
                

                done();
            }).catch((err)=>done(err))
                
        });
    }).timeout(30000);
    it("should not work without an email", (done) => {
        chai.request(server)
        .post("/api/user/signup")
        .send({ password: "84774483" })
        .end((err, res) => {
            res.should.have.status(400);
            
            done();
        });
    });
    it("should not work without a password", (done) => {
        chai.request(server)
        .post("/api/user/signup")
        .send({ email: "tester2@gmail.com" })
        .end((err, res) => {
            res.should.have.status(400);
            
            done();
        });
    });
    it("should not work with a duplicate email", (done) => {
        chai.request(server)
        .post("/api/user/signup")
        .send({ email: "tester1@gmail.com", password: "84774483"})
        .end((err, res) => {
            res.should.have.status(400);
            
            done();
        });
    }).timeout(30000);
})
})