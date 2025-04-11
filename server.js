require("dotenv").config();
const app = require("./bin/index");
const keys = require("./bin/keys");
const connection = require("./src/middleware/connection");

// Inicializa o servidor
app.listen(keys.server.port, async (err) => {
  connection.verify();
  if (err) {
    console.log("==> [-] Falha na aplicação");
  } else {
    console.log("==> [+] Aplicação funcionando");
  }
});
