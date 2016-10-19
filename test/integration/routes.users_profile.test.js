process.env.NODE_ENV = process.env.NODE_ENV || 'test';

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
    User.insert(userOne).then(function(err) {
      done();
    });
  });

  afterEach((done) => {
    User.all().del()
      .then(function(err) {
        done();
      });
  });

  describe('GET /user/profile/:user_id', () => {
    xit('should render the user profile', (done) => {
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

  describe('DELETE /user/profile/:user_id', () => {
    xit('should delete the user', (done) => {

      userTwo = {
        id: 4,
        first_name: 'Test2',
        last_name: 'Tester2',
        email: 'test2@example.com',
        username: 'testnado2'
      };

      User.insert(userTwo).then(function(err) {
        console.log('YO');
        chai.request(server)
          .delete('/user/profile/' + userTwo.id)
          .end((err, res) => {
            console.log('yo');
            User.all().where('id', userTwo.id)
              .then(function(err) {
                console.log('error!',err);
                console.log('redirects!',res.redirects);
                res.redirects[0].should.include('users/login');
                res.text.should.include('login');
                done();
              });
          });
      });

    });
  });

});
