const chai = require('chai');
const expect = require("chai").expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

const request = require("supertest");

const app = require("../../../index");
const server = require("../../../models");

describe("Albums api", () => {
    before((done) => {
        server.connect()
        done();
    });
    after((done) => {
        // server.close()
        done();
    });

    const userId = '6110f28367453f709f5b7f16'
    it('OK, creating an album', (done) => {
        request(app).post(`/album/add/${userId}`)
            .send({ title: 'Title2', images: "6110f28967453f709f5b7f18" })
            .then((res) => {
                const body = res.body;
                // console.log(body)
                expect(body).to.contain.property("images");
                expect(body).to.contain.property("_id");
                expect(body).to.contain.property('user');
                expect(body).to.contain.property("title");
                expect(body).to.contain.property("createdAt");
                expect(body).to.contain.property("updatedAt");
                done();
            }).catch(done);
    })

    const albumId = '611353b93b51a9186db00bd2'
    it('OK, updating an album', (done) => {
        request(app).post(`/album/update/${albumId}`)
            .send({ images: "6112fe18a587097fd2e5417e" })
            .then((res) => {
                const body = res.body;
                expect(body).to.contain.property("images");
                expect(body).to.contain.property("_id");
                expect(body).to.contain.property("user");
                expect(body).to.contain.property("title");
                expect(body).to.contain.property("createdAt");
                expect(body).to.contain.property("updatedAt");
                done();
            }).catch(done);
    })

    // const userId = '6110f28367453f709f5b7f16'
    //     it('OK, return all albums for a user', (done) => {
    //         request(app).post(`/album/all/${userId}`)
    //             .then((res) => {
    //                 const body = res.body;
    //                 expect(body).to.not.have.property("images");
    //                 // expect(body).to.be.an('object').that.includes("images", "_id", "user", "title", "createdAt", "updatedAt");
    //                 // expect(body).should.have.keys("images", "_id", "user", "title", "createdAt", "updatedAt");
    //                 // expect(body).to.contain.property("_id");
    //                 // expect(body).to.contain.property("user");
    //                 // expect(body).to.contain.property("title");
    //                 // expect(body).to.contain.property("createdAt");
    //                 // expect(body).to.contain.property("updatedAt");
    //                 done();
    //             }).catch(done);
    // })

    it('OK, return specific album contents', (done) => {
        request(app).get(`/album/${albumId}/content`)
            .end((err, res) => {
                return Promise.all([
                    res.should.have.status(200),
                    // console.log(res.body),
                    // res.body.should.have('images'),
                    // done()
                ]).then((res) => {
                    // console.log(res[0])
                    done()
                })
            });
        // .then((res) => {
        //     const body = res.body;
        //     console.log(body)
        //     expect(body).to.include.all.keys("images")
        //         // expect(body).to.contain.property("images");
        //         // expect(body).to.contain.property("_id");
        //         // expect(body).to.contain.property("user");
        //         // // expect(body).to.contain.property("title");
        //         // expect(body).to.contain.property("createdAt");
        //         // expect(body).to.contain.property("updatedAt");
        //     done();
        // }).catch(done);
    })
});