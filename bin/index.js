const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cliente_routes = require("../src/routes/cliente");
const funcionario_routes = require("../src/routes/funcionario");
const login_routes = require("../src/routes/login");
const home_routes = require("../src/routes/home");

const app = express();

// configurando parser
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// configurando frontend
app.set("view engine", "ejs");
app.set("views", "views");

// definindo arquivos estáticos
app.use(express.static("public"));

// Chamando rotas
app.use("/", login_routes);
app.use("/home", home_routes);
app.use("/cliente", cliente_routes);
app.use("/funcionario", funcionario_routes);

// exportando aplicação
module.exports = app;
