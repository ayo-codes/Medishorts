const express = require("express");
const bodyParser = require("body-parser"); 

const productsRoutes = require("./routes/products-routes");

const app = express();



// app.get("/", (req, res) => {
//   res.send("Hello World");
//   console.log("Server running on %s" , req.headers.host + req.url);
// });

app.use(productsRoutes);

app.listen(3000);

