const modelo = require("../models/funcionario");
const bcrypt = require("bcrypt");
const salt = 10;

class Funcionario {
  static async criar(dados) {
    let { senha } = dados;
    const hash = await bcrypt.hash(senha, salt);
    senha = hash;
    dados.senha = senha;

    return await new modelo(dados).save();
  }

  static async validarRegistro(dados) {
    const { email } = dados;
    const funcionario = await modelo.findOne({ email });

    return funcionario;
  }

  static async autenticar(dados) {
    const { matricula } = dados;
    const funcionario = await modelo.findOne({ matricula });

    return funcionario;
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
}

module.exports = Funcionario;
