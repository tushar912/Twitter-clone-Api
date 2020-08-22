const {expect} = require('chai');
const chai = require('chai');

const chaiHttp = require('chai-http');
const mocha = require('mocha');
const server = require('../index.js');
const mongoose = require('mongoose');
const should = chai.should();
chai.use(chaiHttp);

describe("twitter",()=>{
    before((done)=>{
        mongoose.connect('mongodb://localhost:27017/twitter', done);
    })
    describe("GET /",()=>{
        it("should provide basic info about api",(done)=>{

            chai.request(server).get('/')
            .end((err,res)=>{
                res.should.have.status(200);
                    res.should.be.html;
                    res.text.should.be.equal("Welcome to the Twitter API <br> Visit /api for the API functionality.");
                    done();
            })
        })
        it('should handle 404 error',(done)=>{
            chai.request(server)
            .get("/lwkdngdkn")
            .end((err, res) => {
                res.should.have.status(404);
                done();
        });
        })
    })

})


