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

  async GetChats(user_id) {
    try {
      let res = await pool.query(
        `SELECT
    c.id,
    c.type,
    c.title,
    c.avatar,
    m.content AS last_message,
    m.created_at AS last_message_at
FROM chats AS c

INNER JOIN chat_members AS cm
    ON cm.chat_id = c.id

LEFT JOIN messages AS m
    ON m.id = (
        SELECT MAX(m2.id)
        FROM messages AS m2
        WHERE m2.chat_id = c.id
    )

WHERE cm.user_id = ?

ORDER BY COALESCE(m.created_at, c.created_at) DESC;`,
        [user_id],
      );
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }

  async GetChatDetail(chat_id, user_id) {
    try {
      let res = await pool.query(
        `SELECT
    c.id,
    c.type,
    c.title,
    c.avatar,
    c.created_by,
    c.created_at
FROM chats AS c
INNER JOIN chat_members AS cm
    ON cm.chat_id = c.id
WHERE
    c.id = ?
    AND cm.user_id = ?;`,
        [chat_id, user_id],
      );
      let data = res[0];
      return data;
    } catch (err) {
      console.log(err);
      return { error: "there was a error" };
    }
  }
}
