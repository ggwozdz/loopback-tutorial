var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('Couple', function() {
  it('should get token', function(done) {
    api.post('/couples/token')
    .send({
      "email":"test@test17",
      "password":"abc123"
    })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        var tokenInfo = res.body;



        if (err) {
          return done(err);
        }

        expect(tokenInfo.token_type).to.eq('bearer');
        done();
      });
  });
});
