const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const requireAuth = require("../../Middleware/session");
require('dotenv').config();
const userHandler = require('../../handlers/userHandler')
const userr_handler = new userHandler();


Router.get("/profile", requireAuth, async (req, res) => {

});

Router.post("/signup", async (req, res) => {

});

Router.post('/signin', async (req, res) => {

});

Router.post("/logout", (req, res) => {

});

module.exports = Router; 
