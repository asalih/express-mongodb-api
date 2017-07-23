const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app.js");
const should = chai.should();


chai.use(chaiHttp);

describe("GET drivers", () => {
    it('should GET drivers', (done) => {
        chai.request(app)
            .get('/drivers')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.drivers.should.be.a('array');
                res.body.drivers.length.should.be.gt(0);
                done();
            });
    });
});

var createdId = "";
describe('driver create', () => {
    it('should not create driver without coordinates', (done) => {
        chai.request(app)
            .post('/driver')
            .send({
                "fullName": "James Hetfield",
                "rate": 4.7,
                "car": "Mustang"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.error.should.be.a('string');
                done();
            });
    });

    it('should create driver', (done) => {
        chai.request(app)
            .post('/driver')
            .send({
                "fullName": "Test",
                "rate": 1,
                "car": "Test",
                "location": {
                    "type": "Point",
                    "coordinates": [0, 0]
                }
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                createdId = res.body._id;
                done();
            });
    });
});

describe('get driver', () => {
    it('should GET driver with the given id', (done) => {
        chai.request(app)
            .get('/driver/' + createdId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('update driver', () => {
    it('should UPDATE driver with the given id', (done) => {
        chai.request(app)
            .put('/driver/' + createdId)
            .send({ "fullName": "Test Driver" })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.fullName.should.be.eql("Test Driver");
                done();
            });
    });
});

describe('delete driver', () => {
    it('should DELETE driver with the given id', (done) => {
        chai.request(app)
            .delete('/driver/' + createdId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.done.should.be.eql(true);
                done();
            });
    });
});