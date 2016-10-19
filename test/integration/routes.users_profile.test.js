process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const chai = require('chai');
// const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/server/app');

const Users = require('../../src/server/modules/users');

var userOne;
var userOneID;

describe('routes : users_profile', () => {

  beforeEach((done) => {
    userOne = {
      first_name: 'Test',
      last_name: 'Tester',
      email: 'test@example.com',
      username: 'testnado'
    };
    Users.insert(userOne).then(function(user) {
      userOneID = user[0].id;
      console.log('user.id', userOne);
      done();
    });
  });

  afterEach((done) => {
    Users.remove(userOneID)
      .then(function(err) {
        done();
      });
  });

  describe('GET /user/profile/:user_id', () => {
    xit('should render the user profile', (done) => {
      console.log('user.id', userOne);
      chai.request(server)
        .get('/user/profile/' + userOneID)
        .end((err, res) => {
          // res.redirects.length.should.equal(0);
          // res.status.should.equal(200);
          // res.type.should.equal('text/html');
          res.text.should.include(userOne.username);
          done();
        });
    });
  });

  describe('DELETE /user/profile/:user_id', () => {
    it('should delete the user', (done) => {
      chai.request(server)
        .delete('/user/profile/' + userOneID)
        .end((err, res) => {
          console.log('yo');
          Users.all().where('id', userOneID)
            .then(function(err) {
              console.log('error!', err);
              console.log('redirects!', res.redirects);
              res.redirects[0].should.include('users/login');
              res.text.should.include('login');
              done();
            });
        });

    });
  });

});
