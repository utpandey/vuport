const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const request = require("supertest");

const app = require("../../../index");
const server = require("../../../models");

describe("Images api", () => {
    before((done) => {
        server.connect()
        done();
    });
    after((done) => {
        // server.close()
        done();
    });

    it('OK, posting a new image', (done) => {
        request(app).post('/picture/add/:userId')
            .send({ link: 'https://gallery-app-mern.s3.ap-south-1.amazonaws.com/0d679fdb1ac01128e8323a338f7a5d9c', album: "6110f39032834676621b1cbc", user: "6110f28367453f709f5b7f16" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("_id");
                expect(body).to.contain.property("album");
                expect(body).to.contain.property("link");
                // expect(body).to.contain.property("user");
                // expect(body).to.contain.property("createdAt");
                // expect(body).to.contain.property("updatedAt");
                done();
            }).catch(done);
    })

    // it('OK, deleting an image', (done) => {
    //     request(app).del('/picture/delete/61111db01c91182816c89fa6')
    //         .then((res) => {
    //             const body = res.body;
    //             expect(body).to.contain.property("album");
    //             expect(body).to.contain.property("link");
    //             expect(body).to.contain.property("user");
    //             expect(body).to.contain.property("createdAt");
    //             expect(body).to.contain.property("updatedAt");
    //             done();
    //         }).catch(done);
    // })
});