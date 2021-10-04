const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const request = require("supertest");

const app = require("../../../index");
const server = require("../../../models");

describe("User api", () => {
    before((done) => {
        server.connect()
        done();
    });
    after((done) => {
        // server.close()
        done();
    });

    it('OK, signing in', (done) => {
        request(app).post('/user/signin')
            .send({ email: 'utshav@gmail.com', password: "1hhh23456" })
            .then((res) => {
                const body = res.body;
                console.log(body)
                expect(body).to.contain.property("token");
                expect(body).to.contain.property("id");
                done();
            }).catch(done);
    })

    it('OK, signup for a new user', (done) => {
        request(app).post('/user/signin')
            .send({ email: 'utshav@gmail.com', password: "1hhh23456", firstName: "John", lastName: "Doe" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("id");
                expect(body).to.contain.property("token");
                done();
            }).catch(done);
    })
});