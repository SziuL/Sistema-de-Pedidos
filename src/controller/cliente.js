const Cliente = require("../resources/cliente");

exports.getCriar = async (req, res, next) => {
  try {
    return res.send("oi, aqui renderizo cadastro");
  } catch (err) {
    next(err);
  }
};

exports.postCriar = async (req, res, next) => {
  try {
    const cliente = await Cliente.criar(req.body);
    return res.json(cliente);
  } catch (err) {}
};
