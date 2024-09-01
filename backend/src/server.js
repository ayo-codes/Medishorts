const express = require("express");
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


const usersRoutes = require("./routes/users-routes");
const productRequestsRoutes = require("./routes/product-requests-routes");
const productsRoutes = require("./routes/products-routes");
const webScrapeRoutes = require("./routes/web-scrape-routes");

const ApiHttpError = require("./models/api-http-error");

const app = express();


// app.get("/", (req, res) => {
//   res.send("Hello World");
//   console.log("Server running on %s" , req.headers.host + req.url);
// });

// BODY PARSER MIDDLEWARE
app.use(bodyParser.json()); 

// CORS HEADERS MIDDLEWARE
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});
 
// PRODUCTS ROUTE MIDDLEWARE
app.use("/api/products", productsRoutes);

// USERS ROUTE MIDDLEWARE
app.use("/api/users", usersRoutes);

// PRODUCT REQUESTS ROUTE MIDDLEWARE
app.use("/api/product-requests", productRequestsRoutes);

// WEB SCRAPING ROUTE MIDDLEWARE
app.use("/api/web-scraper", webScrapeRoutes);

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


// PORT TO LISTEN ON and Start Mongoose Connection
mongoose.connect(process.env.MONGO_URI).then(() => {   
app.listen(3000);
}).catch((err) => {
  console.log(err);
} );
