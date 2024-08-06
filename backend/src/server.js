const express = require("express");

const app = express();


app.get("/", (req, res) => {
  res.send("Hello World");
  console.log("Server running on %s" , req.headers.host + req.url);
});

app.listen(3000);

