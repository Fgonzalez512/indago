const databaseName = 'indago';

module.exports = {
  development: {
    client: 'pg',
    connection: `postgres://localhost/${databaseName}_dev`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: `postgres://localhost/${databaseName}_test`,
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    },
  },
  staging: {
    client: 'pg',
    connection: {
      host:'postgres://indago-stg.cnq4ko059scz.us-east-1.rds.amazonaws.com:5432',
      user:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      databaseName: `${databaseName}_stg`
    },
    migrations: {
      directory: __dirname + '/src/server/db/migrations'
    },
    seeds: {
      directory: __dirname + '/src/server/db/seeds'
    },
  }
};
