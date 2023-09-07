import getFileFromServer from "./modules/getFileFromServer.js"
import xlcToJson from "./modules/xlcToJson.js"



getFileFromServer('http://www.pogremuhi.com/pricelist/', './files//price.xls')

function list(){
    xlcToJson('./files/price.xls')
}


list()