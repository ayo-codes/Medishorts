const ApiHttpError = require("../models/api-http-error");

const ShortProductsHpra = require("../models/shortProductsHpra");
const webScrapper = require("../web-scrapper/webScrapper");


// WEB SCRAPPER CONTROLLER TO SAVE the shortProductsHpra JSON data from webScrapper.js to MongoDB
// eslint-disable-next-line consistent-return
const webScrapeTrigger = async (req, res, next) => {
  console.log ("Web Scrape Request received");
  const scrappedData = await webScrapper.webScrapper();
  
  try {
    // Save the scrappedData to MongoDB using mongoose
    await ShortProductsHpra.deleteMany({});
    await ShortProductsHpra.insertMany(scrappedData);
    console.log("Data saved to MongoDB");
  } catch (error) {
    const apiError = new ApiHttpError("Failed to save data to MongoDB", 500);
    return next(apiError);
  }  

  return res.json({ scrappedData });
};


// Export the webScrape function
exports.webScrapeTrigger = webScrapeTrigger;