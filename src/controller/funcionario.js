const Funcionario = require("../resources/funcionario");
const cript = require("bcrypt");
const auth = require("../middleware/auth");
const storage = require("../middleware/localtoken");

// funções para login de funcionários no sistema
exports.getLogar = async (req, res, next) => {
  try {
    return res.send("estou na pagina de logar");
  } catch (err) {
    next(err);
  }
};

exports.postLogar = async (req, res, next) => {
  try {
    const resultado = await Funcionario.autenticar(req.body);
    if (!resultado) {
      return res.send("Funcionario nao foi encontrado!");
    }

    if (!(await cript.compare(req.body.senha, resultado.senha))) {
      return res.send("Senha incorreta.");
    }

    const token = await auth.gerarToken({ resultado });

    storage.setInLocal("login", token);

    console.log("funcionario logado.");

    return res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.getDeslogar = async (req, res, next) => {
  try {
    storage.removeLocal("login");
    return res.json({
      Success: "Funcionario deslogado com sucesso.",
    });
  } catch (err) {
    next(err);
  }
};

// funções para registro de funcionário
exports.getCriar = async (req, res, next) => {
  try {
    return res.send("oi, aqui renderizo cadastro");
  } catch (err) {
    next(err);
  }
};

exports.postCriar = async (req, res, next) => {
  try {
    let resultado = await Funcionario.autenticar(req.body);

    if (!resultado) {
      const funcionario = await Funcionario.criar(req.body);
      return res.json(funcionario);
    } else {
      res.json({ error: "Funcionario já existe na base de dados." });
    }
  } catch (err) {
    next(err);
  }
};

exports.buscaTodos = async (req, res, next) => {
  try {
    const todos = await Funcionario.buscaTodos();
    return res.json(todos);
  } catch (err) {
    next(err);
  }
};
