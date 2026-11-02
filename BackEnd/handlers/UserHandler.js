const UserModel = require("../models/UserModel.js");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
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
        let db_res = await user_model.GetUserByEmail(req.body.email);
        if (db_res.error) {
          res.status(500).send({ error: "there was a error" });
        } else {
          if (db_res == 0) {
            res.status(400).send({ error: "the username or password is not correct" });
          } else {
            let pass_check = await bcrypt.compare(req.body.password, db_res[0].password);
            if (!pass_check) {
              res.status(400).send({ error: "the username or password is not correct" });
            } else {
              let token = jwt.sign({ id: db_res[0].id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
              });
              res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 1000,
              });
              res.send({ status: "sucsses" });
            }
          }
        }
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
    let user = await user_model.GetUserByID(req.userData.id);
    if (user.error) {
      res.status(500).send("there was a error");
    } else {
      if (user.length == 0) {
        return res.send({ error: "the user was not found" });
      } else {
        let data_send = {
          id: user[0].id,
          name: user[0].name,
          email: user[0].email,
          date_joined: user[0].date_joined,
        };
        res.send(data_send);
      }
    }
  }

  async Logout(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
      });
      res.send({ status: "succses" });
    } catch (er) {
      console.log(er);
      return res.status(500).send({ error: "there was a error" });
    }
  }
}

module.exports = UserHandler;
