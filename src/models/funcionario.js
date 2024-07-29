const mongoose = require("mongoose");

schema = new mongoose.Schema({
  matricula: {
    type: Number,
    required: true,
    unique: true,
  },
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("funcionarios", schema);
