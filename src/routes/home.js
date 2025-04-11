const Home = require("../controller/home");
const express = require("express");
const router = express.Router();
const { autorizar } = require("../middleware/auth");

router.get("/", autorizar, Home.getHome);

module.exports = router;
