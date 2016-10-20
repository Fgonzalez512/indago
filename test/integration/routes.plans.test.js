process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

// const bcrypt = require('bcrypt-nodejs');
// const password_hash = bcrypt.hashSync('password');
// console.log(password_hash);
// console.log('^^^^^password_hash above^^^^^');

const server = require('../../src/server/app');
const knex = require('../../src/server/db/connection');

const agent = chai.request.agent(server);

// let cookie = response.res.req._headers.cookie.slice(8, 382);

describe('routes : plans', () => {

  beforeEach((done) => {
    done();
  });

  afterEach((done) => {
    done();
  });

  xdescribe('GET /plans', () => {
    it('should render the plans', (done) => {
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
  xdescribe('POST /plans', () => {
    it('should add a new plan to the database', (done) => {
      agent.post('/users/login')
        .send({
          email: 'margo',
          password: 'password',
        })
        .then((response) => {
          agent.post('/users/2/plans/new')
            .send({
              name: 'New Plan 1'
            })
            .end((err, res) => {
              res.status.should.equal(200);
              res.redirects.length.should.equal(1);
              res.type.should.equal('text/html');
              knex('plans').where({
                name: 'New Plan 1'
              })
                .first()
                .then((data) => {
                  data.shoud.not.be.undefined;
                  data.name.should.equal('New Plan 1');
                  done();
                });
            });
        });
    });
  });

  xdescribe('POST /users/:user_id/plans/:plan_id/new', () => {
    it('should add a new place to the database with column plan_id equaling the :plan_id param', (done) => {
      agent.post('/users/login')
        .send({
          email: 'margo',
          password: 'password',
        })
        .then((response) => {
          agent.post('/users/2/plans/1/places/new')
            .send({
              name: 'Stiles Switch',
              address: '6066 N Lamar Blvd',
              city: 'Austin',
              state: 'TX',
              zipcode: '78751',
            })
            .end((err, res) => {
              console.log('asldjkanlkjdnl');
              res.status.should.equal(302);
              res.type.should.equal('text/html');
              knex('places').where({
                plan_id: 1,
              }).then((data) => {
                console.log(data);
                data.should.not.be.undefined;
                data.should.include('Stiles Switch');
                done();
              });
            });
        });
    });
  });
});
