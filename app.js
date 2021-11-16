const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Import Routes
const messagesRoute = require("./routes/messages");

app.get("/", (req, res) => {
  res.sendFile("main.html", { root: __dirname });
});
app.use("/messages", messagesRoute);

app.listen(process.env.PORT || 5000);
