const express = require("express");
const bodyParser = require("body-parser"); 

const usersRoutes = require("./routes/users-routes");
const productsRoutes = require("./routes/products-routes");
const ApiHttpError = require("./models/api-http-error");

const app = express();


// app.get("/", (req, res) => {
//   res.send("Hello World");
//   console.log("Server running on %s" , req.headers.host + req.url);
// });

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json()); 
 
// PRODUCTS ROUTE MIDDLEWARE
app.use("/api/products",productsRoutes);

// USERS ROUTE MIDDLEWARE
app.use("/api/users", usersRoutes);

// ROUTE NOT FOUND MIDDLEWARE
app.use((req , res, next ) => {
  const error = new ApiHttpError("Could not find your route, apologies", 404);
  return next(error);
});

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

