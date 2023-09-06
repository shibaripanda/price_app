import xlsToJSON from "excel-to-clean-json"

export default function xlcToJson(fileLink){
    const loop = xlsToJSON.rows(fileLink, 'Price')
    const newloop = loop.slice(8)
    const result = newloop.filter(item => (item[4].split(' ')).includes('Y7') && item[3] == '+')
    for (let i of result){
        console.log(i[0] + ': ' + i[4] + ' ' + i[5] + ' Price: ' + i[6])
    }
}