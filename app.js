const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//Import Routes
const messagesRoute = require("./routes/messages");
const { application } = require("express");

app.use("/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send("go to /messages");
});

app.listen(3000);
