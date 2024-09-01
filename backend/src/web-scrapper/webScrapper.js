const puppeteer = require("puppeteer");

const webScrapper = async () => {
  // const browser = await puppeteer.launch(); // launch a new browser instance

  const browser = await puppeteer.launch({ headless: true, defaultViewport: false, userDataDir: "./tmp"}); // launch a new browser instance in headless mode and adjust the viewport and set the user data directory for captcha solving

  const page = await browser.newPage(); // create a new page

  await page.goto("https://www.hpra.ie/homepage/medicines/medicines-information/medicines-shortages/shortages-list"); // navigate to the page

  await page.waitForSelector("table"); // wait for the table to load
  await page.waitForSelector("#table-short_length > label > select"); // this is the selector of the dropdown to select the number of rows per page
  await page.select("#table-short_length > label > select", "100"); // select 100 rows per page

  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("#table-short tr")); // select all the table rows
    return rows.map(row => {
      const cells = Array.from(row.querySelectorAll("td")); // select all the cells in the row

        // Split the text content of column1 by newline characters and map to properties
  const column1Text = cells[0] ? cells[0].innerText.split("\n") : [];
  const column1Object = {
    productName: column1Text[0] || null,
    hpraCode: column1Text[1] || null,
    manufacturer: column1Text[2] || null,
    // Add more properties if needed
  };
      return {
        productDetails: column1Object,
        genericName: cells[1] ? cells[1].innerText : null,
        therapeuticAlternative: cells[2] ? cells[2].innerText : null,
        shortageReason: cells[3] ? cells[3].innerText : null,
        shortageDate: cells[4] ? cells[4].innerText : null,
        expectedReturnDate: cells[5] ? cells[5].innerText : null,
        additionalInfo: cells[6] ? cells[6].innerText : null,
        lastUpdateDate: cells[7] ? cells[7].innerText : null,
        // Add more columns as needed
      };
    }).filter(row => row.productDetails && row.genericName !== null); // filter out rows that don't have data
  });




  // await page.screenshot({ path: "screenshots/example.png" }); // take a screenshot of the page
  console.log(data); // log the data to the console

  await browser.close(); // close the browser
};

webScrapper(); // call the function

