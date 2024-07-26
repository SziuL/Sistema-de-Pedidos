'use strict'

module.exports = {
  server: {
    port: process.env.port || 3000,
  },
  database: {
    connection: process.env.connection || "",
  },

  auth: {
    secret: "",
  },
};
