var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Tesing Suite', function () {

    it('Fetch resturants', function () {
        return agent.get('/resturant?zipcode=95110&dish=')
            .then(function (res) {
                expect(res.body.data.length).to.equal(2);

            });
    });

    it('Customer Login', function () {
        return agent
            .post('/buyer')
            .send({ email: 'buyer1@gmail.com', pwd: 'buyer1' })
            .then(function (res) {
                expect(res.body.error).to.equal(false);
            });
    });

    it('Resturant owner Login', function () {
        return agent
            .post('/merchant')
            .send({ email: 'rest1@gmail.com', pwd: 'rest1' })
            .then(function (res) {
                expect(res.body.error).to.equal(false);
            });
    });

    it('Fetch cuisines', function () {
        return agent.get('/resturant/cuisine')
            .then(function (res) {
                expect(res.body.data.length).to.equal(3);

            });
    });

    it('Fetch items offered by a resturant', function () {
        return agent.get('/resturant/id?resturantId=3')
            .then(function (res) {
                expect(res.body.data.length).to.equal(6);

            });
    });
})
