import getFileFromServer from "./modules/getFileFromServer.js"
import openExcelFile from "./modules/openExcelFile.js"
import xlcToJson from "./modules/xlcToJson.js"

xlcToJson('./files/NewPrice.xls')

// openExcelFile('./files/q.xlsx')


// getFileFromServer('http://www.pogremuhi.com/pricelist/05.09.2023.xls', './files/NewPrice.xls')