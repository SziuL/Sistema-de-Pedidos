const express = require("express");
const bp = require("body-parser");

const app = express();

// configurando parser
app.use(bp.json({ limit: "10mb" }));
app.use(bp.urlencoded({ extendend: false }));

// configurando frontend
app.set("view engine", "ejs");
app.set("views", "views");

// definindo arquivos estáticos
app.use(express.static("public"));

const cliente_route = require("../src/routes/cliente");
app.use("/cliente", cliente_route);

// chamando rotas
app.use("/", (req, res) => {
  return res.render("login");
});

// exportando aplicação
module.exports = app;
