process.env.NODE_ENV = 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

describe('routes : users', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('GET /users', () => {
    it('should render the users', (done) => {
      chai.request(server)
        .get('/users')
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
