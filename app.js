const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Import Routes
const messagesRoute = require("./routes/messages");

app.use("/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send(
    'site = https://message-handler-test.herokuapp.com\
  MESSAGE contains:\
      "sender" : String,\
      "receiver": String,\
      "subject": String,\
      "message": String\
  api commands:\
  1.Write message in general -> POST site/messages MESSAGE \
  2.Write message from user to user ->  POST site/messages/USER MESSAGE(without sender)\
  3.Get all messages for a specific user -> GET site/messages/USER\
  4.Get all unread messages for a specific user -> GET site/messages/USER/unread\
  5.Read message (return one message) - GET site/messages/USER/MESSAGE.id\
  6.Delete message (as owner or as receiver) - DELETE site/messages/USER/MESSAGE.id'
  );
});

app.listen(process.env.PORT || 5000);
