const storage = require("./localtoken");
const jwt = require("jsonwebtoken");
const keys = require("../../bin/keys");

const SECRET = keys.auth.secret;

exports.gerarToken = async (dados) => {
  return jwt.sign(dados, keys.auth.secret);
};

exports.decodificar = async (token) => {
  return jwt.verify(token, SECRET);
};

exports.autorizar = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).send("Permissão negada. Nenhum token fornecido.");
    }

    const dados = jwt.verify(token, SECRET);
    const tokenSalvo = storage.getInLocal(dados.id);

    if (!tokenSalvo || token !== tokenSalvo) {
      return res.status(403).send("Sessão inválida ou expirada.");
    }

    req.usuario = dados;
    next();
  } catch (err) {
    return res.status(401).send("Token expirado ou inválido.");
  }
};

exports.logout = (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const dados = jwt.verify(token, SECRET);
      storage.removeLocal(dados.id);
    } catch {}
  }

  res.clearCookie("token");
  res.redirect("/");
};
