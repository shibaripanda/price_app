import http from "http"
import fs from "fs"

export default function getFileFromServer(link, nameFile){
    const now = new Date().toLocaleDateString()
    console.log(now)
    let yestarday
    let yestarday1
    if(now.split('.')[0][0] == 0){
        yestarday = '0' + (now.split('.')[0] = Number(now.split('.')[0]) - 1) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
        yestarday1 = '0' + (now.split('.')[0] = Number(now.split('.')[0]) - 2) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
    }
    else{
        yestarday = (now.split('.')[0] = Number(now.split('.')[0]) - 1) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
        yestarday1 = '0' + (now.split('.')[0] = Number(now.split('.')[0]) - 2) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
    }
    console.log(yestarday)

    for (let i of [now,  yestarday, yestarday1]){
            http.get(link + i + '.xls', response => {
            if(response.statusMessage == 'OK'){
                const file = fs.createWriteStream(nameFile)
                response.pipe(file)
                console.log('getFileFromServer OK')
            }
            else{
                console.log('getFileFromServer Error')
            }
        }) 
    }
}