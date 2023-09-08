import xlsToJSON from "excel-to-clean-json"
import fs from "fs"

export default function xlcToJson(fileLink){
    return new Promise(function(resolve, reject) {
        fs.stat(fileLink, function(err, stats) {
            if(err){
                console.log('Прайс не найден')
            }
            else{
                const result = xlsToJSON.rows(fileLink, 'Price').slice(8)
                // console.log(result)
                resolve(result)
            }
        })
    })
} 
