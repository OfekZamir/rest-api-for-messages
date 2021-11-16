const express = require("express");
const router = express.Router();
const Message = require("../Modules/message");
const messages_data = require("../demo_data.json");

//Write message
router.post("/", async (req, res) => {
  const message = new Message(
    req.body.sender,
    req.body.reciver,
    req.body.subject,
    req.body.message
  );
  messages_data.messages.push(message);
  res.send("message sent");
});

//Get all messages
router.get("/", (req, res) => {
  res.send(messages_data);
});

//Get all messages for a specific user
router.get("/:user", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.reciver == req.params.user) {
      user_messages.push(message);
    }
  });
  res.send(user_messages);
});

//Get all unread messages for a specific user
router.get("/:user/unread", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.reciver == req.params.user && message.isread == false) {
      user_messages.push(message);
    }
  });
  res.send(user_messages);
});

//Read message
router.get("/:user/:id", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.reciver == req.params.user && message.id == req.params.id) {
      message.isread = true;
      user_messages.push(message);
    }
  });
  res.send(user_messages);
});

//Write message as user
router.post("/:user", async (req, res) => {
  const message = new Message(
    req.params.user,
    req.body.reciver,
    req.body.subject,
    req.body.message
  );
  messages_data.messages.push(message);
  res.send({ sucsses: true });
});

//Delete message:
router.delete("/:user/:id", async (req, res) => {
  messages_data.messages.forEach((message) => {
    if (
      (message.sender == req.params.user ||
        message.reciver == req.params.user) &&
      message.id == req.params.id
    ) {
      messages_data.messages.pop(message);
    }
  });
  res.send({ message: "deleted" });
});

module.exports = router;
