const env = require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: "Poyo!1080",
    database: "apidisney",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: "Poyo!1080",
    database: "apidisney",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
