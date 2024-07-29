const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model("clientes", schema);
