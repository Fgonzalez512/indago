
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('plans').insert({city: 'Austin'}),
        knex('plans').insert({city: 'San Francisco'}),
        knex('plans').insert({city: 'New York'}),
        knex('plans').insert({city: 'Seattle'}),
        knex('plans').insert({city: 'Miami'}),
        knex('plans').insert({city: 'Chicago'})
      ]);
    });
};
