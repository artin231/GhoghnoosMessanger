const pool = require("../utils/modelUtil.js");

class UserModel {
  async GetUserByEmail(email) {
    try {
      let res = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async GetUserByUserName(username) {
    try {
      let res = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async GetUserByID(id) {
    try {
      let res = await pool.query(`SELECT * FROM users WHERE id = ?`, [id]);
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async InsertUser(username, email, name, password) {
    try {
      let res = await pool.query(
        `INSERT INTO users (username,email,display_name,password) VALUES (?,?,?,?)`,
        [username, email, name, password],
      );
      return res;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }
}

module.exports = UserModel;
