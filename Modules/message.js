const uuid = require("uuid");

class Message {
  constructor(sender, receiver, subject, message) {
    this.sender = sender || " ";
    this.receiver = receiver || " ";
    this.subject = subject || "no subject";
    this.message = message || "no message";
    this.created_at = new Date();
    this.id = uuid.v4();
    this.isread = false;
  }
}

module.exports = Message;
