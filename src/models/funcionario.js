const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

schema = new mongoose.Schema({
  matricula: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
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
  solicitouAdmin: {
    type: Boolean,
    default: false,
  },
});

schema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();

  // Verifica se a senha já está hasheada
  if (this.senha.startsWith("$2b$")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (err) {
    next(err);
  }
});

schema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model("funcionarios", schema);
