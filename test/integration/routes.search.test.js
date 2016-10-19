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
          res.text.should.include('<input type="text" name="keyword">');
          done();
        });
    });
  });

  describe('POST /search', () => {
    it('should poplulate the page with search results', (done) => {
      chai.request(server)
        .post('/search')
      //add in form data here
        .send({ location : '51.503186,-0.126446'})
        .send({ keyword : 'museum' })
        .end((err, res) => {
        // res.redirects.length.should.equal(1);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.include('<input type="text" name="keyword">');
          res.text.should.include('<p class="search-result">');
          done();
        });
    });
  });
  //TODO: refactor search to use query strings as described below
  // xdescribe('GET /search', () => {
  //   xit('should populate the page with search results', (done) => {
  //     chai.request(server)
  //       .get('/search/?location=austin&q=barbecue')
  //       .end((err, res) => {
  //         res.status.shoudld.equal(200);
  //         res.type.should.equal('text/html');
  //         res.text.should.include();
  //         done();
  //       });
  //   });
  // });
  describe('GET /search/details/:google_places_id', () => {
    it('should show the details for a specific search item', (done) => {
      chai.request(server)
        .get('/search/details/ChIJ7dgNbsvLRIYRFhpmxL4qLVA')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.include('Scubaland Adventures');
          done();
        });
    });
  });
  describe('GET /search/details/:google_places_id', () => {
    it('should contain a dropdown', (done) => {
      chai.request(server)
        .get('/search/details/ChIJ7dgNbsvLRIYRFhpmxL4qLVA')
        .end((err, res) => {
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          res.text.should.include('Scubaland Adventures');
          done();
        });
    });
  });
});
