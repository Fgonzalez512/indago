process.env.NODE_ENV = 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

describe('routes : search', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  describe('GET /search', () => {
    it('should render the search', (done) => {
      chai.request(server)
        .get('/search')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          done();
        });
    });
  });
});
