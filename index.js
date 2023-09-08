import getFileFromServerPogremuhi from "./modules/getFileFromServer.js"
import xlcToJson from "./modules/xlcToJson.js"
import searchInfo from "./modules/searchInfo.js"




getFileFromServerPogremuhi('./files//price.xls', 25)
  .then(
    resolve => {
        setTimeout(() => {
            console.log('ok'+ ' ' + resolve)
            xlcToJson('./files/price.xls')
              .then(result => searchInfo('Poco', result))}, 1000) 
    },
    error => {
        console.log('no')}
  )


    // setTimeout(() => baza = xlcToJson('./files/price.xls'), 5000)
    // setTimeout(() => searchInfo('Xiomi', baza), 7000)






