let pool = require("../utils/modelUtil.js");

class ChatModel {
  async InsertChat(type, title, created_by) {
    try {
      let res = await pool.query(`INSERT INTO chats (type,title,created_by) VALUES (?,?,?)`, [
        type,
        title,
        created_by,
      ]);
      return res;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }
}
