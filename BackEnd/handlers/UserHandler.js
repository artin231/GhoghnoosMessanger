const UserModel = require("../models/UserModel.js");
const Joi = require("joi");

let user_model = new UserModel();

class UserHandler {
  async Login(req, res) {
    try {
      let schema = {
        email: Joi.string().email().min(3).max(200).required(),
        password: Joi.string().min(3).max(200),
      };
      let validate = Joi.object(schema).validate(req.body);

      if (validate.error) {
        res.status(400).send({ error: validate.error.message });
      } else {
        res.send({ status: "passed" });
      }
    } catch (err) {
      console.log(err);
      res.send({ error: "there was a error" });
    }
  }

  async SignUp(req, res) {
    try {
      let schema = {
        username: Joi.string().min(3).max(300),
        nme: Joi.string().min(3).max(100),
        email: Joi.string().email().min(3).max(200).required(),
        password: Joi.string().min(3).max(200),
      };
      let validate = Joi.object(schema).validate(req.body);

      if (validate.error) {
        res.status(400).send({ error: validate.error.message });
      } else {
        res.send({ status: "passed" });
      }
    } catch (err) {
      console.log(err);
      res.send({ error: "there was a error" });
    }
  }

  async Profile(req, res) {
    res.send("profile");
  }

  async Logout(req, res) {
    res.send("logout");
  }
}

module.exports = UserHandler;
