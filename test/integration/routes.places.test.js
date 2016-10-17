process.env.NODE_ENV = 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

describe('routes : places', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('GET /places', () => {
    it('should render the places', (done) => {
      chai.request(server)
        .get('/places')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.contain('<h1>Welcome to Express!</h1>');
          res.text.should.contain('<h2>The sum is 3</h2>');
          done();
        });
    });
  });

});
