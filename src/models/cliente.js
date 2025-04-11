const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
  senha: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: false,
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

module.exports = mongoose.model("clientes", schema);
