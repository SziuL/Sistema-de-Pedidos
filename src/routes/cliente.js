const Cliente = require("../resources/cliente");
const express = require("express");
const router = express.Router();

router.get("/", Cliente.Getcriar);
router.post("/", Cliente.postCriar);

module.exports = router;
