const knex = require('../db/connection');

const User = {
  withEmail: function(email) {
    return knex('users')
      .first()
      .where({
        email: email
      });
  },
  insert: function(user) {
    return knex('users')
      .insert(user)
      .returning(['id', 'first_name', 'last_name', 'email', 'username']);
  },
  all: function() {
    return knex('users');
  }
};

module.exports = User;
