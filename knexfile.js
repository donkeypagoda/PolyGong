'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/polygong_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/polygong_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
