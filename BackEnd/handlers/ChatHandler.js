const ChatModel = require("../models/ChatModel.js");
const Joi = require("joi");

let chat_model = new ChatModel();

class ChatHandler {
  async CreatePrivateChat(req, res) {
    try {
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: "there was a error" });
    }
  }
}
