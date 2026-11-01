const UserModel = require("../models/UserModel.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");

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
      res.status(500).send({ error: "there was a error" });
    }
  }

  async SignUp(req, res) {
    try {
      let schema = {
        username: Joi.string().min(3).max(300).required(),
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().min(3).max(200).required(),
        password: Joi.string().min(3).max(200).required(),
      };
      let validate = Joi.object(schema).validate(req.body);
      if (validate.error) {
        res.status(400).send({ error: validate.error.message });
      } else {
        let db_res = await user_model.GetUserByEmail(req.body.email);
        if (db_res.error) {
          res.status(500).send({ error: "there was a error" });
        } else {
          if (db_res.length > 0) {
            res.status(400).send({ error: "the email is not unique" });
          } else {
            let db_res_user = await user_model.GetUserByUserName(req.body.username);
            if (db_res_user.error) {
              res.status(500).send({ error: "there was a error" });
            } else {
              if (db_res_user.length > 0) {
                res.status(400).send({ error: "the username is not unique" });
              } else {
                let new_pass = await bcrypt.hash(req.body.password, 10);
                let db_res_create = await user_model.InsertUser(
                  req.body.username,
                  req.body.email,
                  req.body.name,
                  new_pass,
                );
                if (db_res_create.error) {
                  res.status(500).send({ error: "there was a error" });
                } else {
                  res.send({ status: "sucsses" });
                }
              }
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "there was a error" });
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
