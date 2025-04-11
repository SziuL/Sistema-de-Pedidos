const modelo = require("../models/cliente");
const bcrypt = require("bcrypt");
const salt = 10;

class Cliente {
  static async criar(dados) {
    let { senha } = dados;
    const hash = await bcrypt.hash(senha, salt);
    senha = hash;
    dados.senha = senha;

    return await new modelo(dados).save();
  }

  static async buscaTodos() {
    return await modelo.find({});
  }

  static async buscarPorId(id) {
    return await modelo.findOne({ _id: id });
  }

  static async atualizar(id, dados) {
    return await modelo.findOneAndUpdate(id, { $set: dados });
  }

  static async deletar(id) {
    return await modelo.findOneAndReplace(id);
  }

  static async validar(dados) {
    let { email } = dados;
    let cliente = await modelo.findOne({ email });
    return cliente;
  }
}

module.exports = Cliente;
