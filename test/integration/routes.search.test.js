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
          res.text.should.include('<input type="text" name="search_type" placeholder="what type of place are you looking for?">');
          done();
        });
    });
  });

  describe('POST /search', () => {
    it('should poplulate the page with search results', (done) => {
      chai.request(server)
        .post('/search')
        //add in form data here
        .send({ lat : '51.503186' })
        .send({ long : '-0.126446' })
        .send({ search_type : 'museum' })
        .end((err, res) => {
          // res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.include();
          done();
        });
    });
  });
});
