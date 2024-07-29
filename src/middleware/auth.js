const storage = require("./localtoken");
const jwt = require("jsonwebtoken");
const keys = require("../../bin/keys");

exports.autorizar = async (req, res, next) => {
  try {
    const token = storage.getInLocal("login");
    if (!token) {
      return res.send("Permissão negada.");
    }

    return next();
  } catch (err) {
    next(err);
  }
};

exports.gerarToken = async (dados) => {
  return jwt.sign(dados, keys.auth.secret);
};

exports.decodificar = async (token) => {
  const dados = jwt.decode(token, keys.secret.auth);
  return dados;
};
