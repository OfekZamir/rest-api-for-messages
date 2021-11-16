const express = require("express");
const router = express.Router();
const Message = require("../Modules/message");
const messages_data = require("../demo_data.json");

//Write message
router.post("/", async (req, res) => {
  const message = new Message(
    req.body.sender,
    req.body.receiver,
    req.body.subject,
    req.body.message
  );
  if (message.sender == " " || message.receiver == " ") {
    res.send({
      sucsses: false,
      reason: "Message must have sender or receiver",
    });
  } else {
    messages_data.messages.push(message);
    res.send({ sucsses: true });
  }
});

//Get all messages
router.get("/", (req, res) => {
  res.send(messages_data);
  console.error("test");
});

//Get all messages for a specific user
router.get("/:user", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.receiver == req.params.user) {
      user_messages.push(message);
    }
  });
  res.send(user_messages);
});

//Get all unread messages for a specific user
router.get("/:user/unread", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.receiver == req.params.user && message.isread == false) {
      user_messages.push(message);
    }
  });
  res.send(user_messages);
});

//Read message
router.get("/:user/:id", (req, res) => {
  const user_messages = [];
  messages_data.messages.forEach((message) => {
    if (message.receiver == req.params.user && message.id == req.params.id) {
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
    req.body.receiver,
    req.body.subject,
    req.body.message
  );
  if (message.receiver == " ") {
    res.send({
      sucsses: false,
      reason: "Message must have receiver",
    });
  } else {
    messages_data.messages.push(message);
    res.send({ sucsses: true });
  }
});

//Delete message:
router.delete("/:user/:id", async (req, res) => {
  messageExist = false;
  messages_data.messages.forEach((message) => {
    if (
      (message.sender == req.params.user ||
        message.receiver == req.params.user) &&
      message.id == req.params.id
    ) {
      messageExist = true;
      messages_data.messages.pop(message);
    }
  });
  if (messageExist) {
    res.send({ sucsses: true, message: "deleted" });
  } else {
    res.send({ sucsses: false, reason: "not found a message by specific id" });
  }
});

module.exports = router;
