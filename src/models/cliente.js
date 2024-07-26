const mongoose = require("mongoose");

smc = (collection_name, object_schema) => {
  const schema = new mongoose.Schema(object_schema);
  return mongoose.model(collection_name, schema);
};

smc("clientes", {
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  telefone: {
    type: String,
    required: true,
  },
});

module.exports = smc;
