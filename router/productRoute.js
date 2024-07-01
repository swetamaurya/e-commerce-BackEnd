const express = require("express");
const route = express.Router
const dotenv = require("dotenv");
const Product = require("../model/productModel");
const User = require("../model/userModel");
dotenv.config()

module.exports = route