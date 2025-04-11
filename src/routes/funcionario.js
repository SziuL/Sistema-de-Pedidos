const Funcionario = require("../controller/funcionario");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", Funcionario.postCriar);
router.post("/logar", Funcionario.postLogar);
router.post("/requisitarAdmin", auth.autorizar, async (req, res) => {
  const token = Storage.getInLocal("login");
  const jwt = require("jsonwebtoken");
  const dados = jwt.decode(token);

  await Funcionario.findByIdAndUpdate(dados.id, { requisitouAdmin: true });

  res.send("Requisição de administrador enviada.");
});

router.get("/", Funcionario.getCriar);
router.get("/logar", Funcionario.getLogar);
router.get("/deslogar", Funcionario.getDeslogar);
router.get("/todos", auth.autorizar, Funcionario.buscaTodos);

module.exports = router;
