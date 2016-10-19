
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('plans').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('plans').insert({city: 'Austin', name: 'Music Day!'}),
        knex('plans').insert({city: 'San Francisco', name: 'Coffee House Crawl'}),
        knex('plans').insert({city: 'New York', name: 'Bar Hopping'}),
        knex('plans').insert({city: 'Seattle', name: 'Music Day!'}),
        knex('plans').insert({city: 'Miami', name: 'Bar Hopping'}),
        knex('plans').insert({city: 'Chicago', name: 'Coffee House Crawl'})
      ]);
    });
};
