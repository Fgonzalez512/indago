process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

const knex = require('../../src/server/db/connection');

describe('routes : plans', () => {

  beforeEach((done) => {
    knex('plans').del()
      .then(() => {
        done();
      });
  });

  afterEach((done) => {
    done();
  });

  describe('GET /plans', () => {
    xit('should render the plans', (done) => {
      chai.request(server)
        .get('/plans')
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          done();
        });
    });
  });
  describe('POST /plans', () => {
    it('should add a new plan to the database', (done) => {
      chai.request(server)
        .post('/plans')
        .send({
          name : 'New Plan 1',
          place_name : 'Stiles Switch',
          address : '6066 N Lamar Blvd',
          city : 'Austin',
          state : 'TX',
          zipcode : 78751,
        })
        .end((err, res) => {
          res.redirects.length.should.equal(0);
          res.status.should.equal(200);
          res.type.should.equal('text/html');
          knex('plans').where({
            name : 'New Plan 1',
          }).first().then((data) => {
            data.should.not.be(null);
            done();
          });
        });
    });
  });
});
