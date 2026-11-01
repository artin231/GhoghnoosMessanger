const express = require("express");
const UserHandler = require("../handlers/UserHandler.js");
const auth = require("../middlewares/auth.js");

let user_handler = new UserHandler();
let Router = express.Router();

Router.post("/login", user_handler.Login);
Router.post("/signup", user_handler.SignUp);
Router.post("/logout", user_handler.Logout);
Router.get("/profile", auth, user_handler.Profile);

module.exports = Router;
