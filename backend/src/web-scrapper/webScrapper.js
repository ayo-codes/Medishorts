const puppeteer = require("puppeteer");
const fs = require("fs");

const webScrapper = async () => {
  // const browser = await puppeteer.launch(); // launch a new browser instance

  const browser = await puppeteer.launch({ headless: true, defaultViewport: false, userDataDir: "./tmp" }); // launch a new browser instance in headless mode and adjust the viewport and set the user data directory for captcha solving

  const page = await browser.newPage(); // create a new page

  await page.goto("https://www.hpra.ie/homepage/medicines/medicines-information/medicines-shortages/shortages-list", { waitUntil: "load" }); // navigate to the page

  await page.waitForSelector("table"); // wait for the table to load
  await page.waitForSelector("#table-short_length > label > select"); // this is the selector of the dropdown to select the number of rows per page
  await page.select("#table-short_length > label > select", "10"); // select 100 rows per page

  const data = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("#table-short tr")); // select all the table rows
    return rows
      .map((row) => {
        const cells = Array.from(row.querySelectorAll("td")); // select all the cells in the row

        // Split the text content of column1 by newline characters and map to properties
        const column1Text = cells[0] ? cells[0].innerText.split("\n") : [];

        //   productName: column1Text[0] || null,
        //   hpraCode: column1Text[1] || null,
        //   manufacturer: column1Text[2] || null,
        //   // Add more properties if needed
        // ;
        return {
          productName: column1Text[0] || null,
          hpraCode: column1Text[1] || null,
          manufacturer: column1Text[2] || null,
          // productDetails: column1Object,
          genericName: cells[1] ? cells[1].innerText : null,
          therapeuticAlternative: cells[2] ? cells[2].innerText : null,
          shortageReason: cells[3] ? cells[3].innerText : null,
          shortageDate: cells[4] ? cells[4].innerText : null,
          expectedReturnDate: cells[5] ? cells[5].innerText : null,
          additionalInfo: cells[6] ? cells[6].innerText : null,
          lastUpdateDate: cells[7] ? cells[7].innerText : null,
          // Add more columns as needed
        };
      })
      .filter((row) => row.productName && row.genericName !== null)
      // .fs.appendFile(
      //   "./shortProductResults/results.csv",
      //   data.map(row => `${row.productName},${row.genericName},${row.therapeuticAlternative},${row.shortageReason},${row.shortageDate},${row.expectedReturnDate},${row.additionalInfo},${row.lastUpdateDate}\n`),
      //   (err) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //   }
      // ); // filter out rows that don't have data


  });

  // await page.screenshot({ path: "screenshots/example.png" }); // take a screenshot of the page
  const csvRows = data.map(row => 
    `${row.productName},${row.hpraCode},${row.manufacturer},${row.genericName},${row.therapeuticAlternative},${row.shortageReason},${row.shortageDate},${row.expectedReturnDate},${row.additionalInfo},${row.lastUpdateDate}`
  ).join("\n");

  const csvHeader = "Product Name,HPRA Code,Manufacturer,Generic Name,Therapeutic Alternative,Shortage Reason,Shortage Date,Expected Return Date,Additional Info,Last Update Date\n";
  
  const csvData = csvHeader + csvRows;

  // Write data to CSV file
  fs.writeFileSync(`./shortProductResults/results${new Date()}.csv`, csvData);
  console.log(data); // log the data to the console

  // Write data to JSON file
  fs.writeFileSync(`./shortProductResults/results ${new Date().toISOString()}.json`, JSON.stringify(data, null, 2));
  console.log("Data written to JSON file");


  await browser.close(); // close the browser
};

webScrapper(); // call the function
