const express = require("express");
const bodyParser = require("body-parser"); 

const productsRoutes = require("./routes/products-routes");

const app = express();



// app.get("/", (req, res) => {
//   res.send("Hello World");
//   console.log("Server running on %s" , req.headers.host + req.url);
// });

// PRODUCTS ROUTE MIDDLEWARE
app.use("/api/products",productsRoutes);

// ERROR HANDLING MIDDLEWARE
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  
  res.status(error.code || 500);
  return res.json({message: error.message || "Hmm..an unknown error has occurred apologies for the inconvenience"});
});

// PORT TO LISTEN ON 
app.listen(3000);

