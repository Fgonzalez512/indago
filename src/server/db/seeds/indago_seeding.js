const Seed = require('../seed_data');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('places').del(),
    knex('plans').del(),
    knex('places').del()
  ])
    .then(() => {
      return Promise.all([
          // Inserts seed entries
        knex('users').insert(Seed.users),
        knex('plans').insert(Seed.plans),
        knex('places').insert(Seed.places)
      ]);
    });
};
