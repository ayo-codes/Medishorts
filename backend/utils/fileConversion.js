const csvToJson =  require("convert-csv-to-json");

const fileInputName = "../productsList/productsList.csv"

const fileOutPutName = "../productsList/productsList.json"

csvToJson.fieldDelimiter(",").
formatValueByType().
generateJsonFileFromCsv(fileInputName, fileOutPutName);

// const json = csvToJson.getJsonFromCSV(fileInputName);
// for(let i=0; i<json.length;i +=1){
//   console.log(json[i]);
// }

