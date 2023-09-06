import xlsToJSON from "excel-to-clean-json"
import fs from "fs"

export default function xlcToJson(fileLink){
    fs.stat(fileLink, function(err, stats) {
        if(err){
            console.log('Прайс не найден')
        }
        else{
            return xlsToJSON.rows(fileLink, 'Price').slice(8)
        }
    })
}