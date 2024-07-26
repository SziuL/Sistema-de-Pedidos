"use strict";

const mongoose = require("mongoose");
const keys = require("../../bin/keys");

module.exports.verify = () => {
  if (mongoose.connect(keys.database.connection)) {
    console.log("==> [+] mongodb");
  } else {
    console.log("==> [-] mongodb");
  }
};
