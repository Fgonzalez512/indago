process.env.NODE_ENV = 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

const User = require('../../src/server/modules/users');

var userOne;

describe('routes : users_profile', () => {

  beforeEach((done) => {
    userOne = {
      id: 1,
      first_name: 'Test',
      last_name: 'Tester',
      email: 'test@example.com',
      username: 'testnado'
    };
    User.insert(userOne).then(function(err){
      done();
    });
  });

  afterEach((done) => {
    User.all().where('username', 'testnado').del()
      .then(function(err){
        done();
      });
  });

  describe.only('GET /user/profile/:user_id', () => {
    it('should render the user profile', (done) => {
      chai.request(server)
        .get('/user/profile/' + userOne.id)
        .end((err, res) => {
          // res.redirects.length.should.equal(0);
          // res.status.should.equal(200);
          // res.type.should.equal('text/html');
          res.text.should.include(userOne.username);
          done();
        });
    });
  });

});
