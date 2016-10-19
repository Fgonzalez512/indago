const knex = require('../db/connection');

const Places = {
  get: {
    list: () => {
      return knex('places');
    },
    withUserID: (place_id) => {
      return knex('places').where({
        id: place_id
      });
    },
    withID: (place_id) => {
      return knex('places').first().where({
        id: place_id
      });
    }
  },
  set: {
    insert: (place) => {
      return knex('places').insert(place).returning(['id']);
    }
  }
};

module.exports = Places;
