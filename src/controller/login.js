const jwt = require("jsonwebtoken");
const keys = require("../../bin/keys");
const storage = require("../middleware/localtoken");
const Funcionario = require("../resources/funcionario");
const Cliente = require("../resources/cliente");

exports.getPage = async (req, res) => {
  return res.render("login/_index");
};

exports.login = async (req, res) => {
  const { senha } = req.body;

  let usuario =
    (await Funcionario.validarRegistro(req.body)) ||
    (await Cliente.validar(req.body));

  if (!usuario) {
    return res.status(401).send("Usuário não encontrado.");
  }

  const valido = await usuario.compararSenha(senha);

  if (!valido) {
    return res.status(401).send("Senha incorreta.");
  }

  const token = jwt.sign(
    { id: usuario._id, tipo: usuario.tipo || "funcionario" },
    keys.auth.secret
  );

  // Armazenar o token usando ID do usuário como chave
  storage.setInLocal(usuario._id.toString(), token);

  // Envia o token para o cliente via cookie
  res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });

  return res.redirect("/home");
};
