const knexConfig = {

  development: {
    client: 'pg',
    connection: {
      user: 'me',
      host: 'localhost',
      database: 'jobtracker',
      password: 'password',
      port: 5432,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations'
    },
    seeds: {
      extension: 'ts',
    }
  },
  // staging and production are not configured correctly, don't use
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

export default knexConfig;
