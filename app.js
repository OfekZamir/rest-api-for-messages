const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
//Import Routes
const messagesRoute = require("./routes/messages");

app.use("/messages", messagesRoute);

app.listen(3000);
