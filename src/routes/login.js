const express = require("express");
const router = express.Router();
const Login = require("../controller/login");

router.get("/", Login.getPage);
router.post("/", Login.login);

module.exports = router;
