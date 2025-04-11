const Cliente = require("../resources/cliente");

exports.getCriar = async (req, res, next) => {
  try {
    return res.render("cadastro/cadastroCliente");
  } catch (err) {
    next(err);
  }
};

exports.postCriar = async (req, res, next) => {
  try {
    let resultado = await Cliente.validar(req.body);

    if (!resultado) {
      const cliente = await Cliente.criar(req.body);
      return res.json(cliente);
    } else {
      res.json({ error: "Cliente já existe na base de dados." });
    }
  } catch (err) {
    next(err);
  }
};

exports.buscaTodos = async (req, res, next) => {
  try {
    const todos = await Cliente.buscaTodos();
    return res.json(todos);
  } catch (err) {
    next(err);
  }
};
