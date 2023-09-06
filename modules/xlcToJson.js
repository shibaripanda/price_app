import xlsToJSON from "excel-to-clean-json"

export default function xlcToJson(fileLink){
    const loop = xlsToJSON.rows(fileLink, 'Price')
    console.log(loop[8139])
}