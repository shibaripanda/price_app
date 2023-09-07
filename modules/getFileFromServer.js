import http from "http"
import fs from "fs"

export default function getFileFromServer(link, nameFile){
    const now = new Date().toLocaleDateString()
    let now1
    let now2
    if(now.split('.')[0][0] == 0){
        now1 = '0' + (now.split('.')[0] = Number(now.split('.')[0]) - 1) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
        now2 = '0' + (now.split('.')[0] = Number(now.split('.')[0]) - 2) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
    }
    else{
        now1 = (now.split('.')[0] = Number(now.split('.')[0]) - 1) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
        now2 = (now.split('.')[0] = Number(now.split('.')[0]) - 2) + '.' + now.split('.')[1] + '.' +  now.split('.')[2]
    }

    for (let i of [now, now1, now2]){
        let x = true
        http.get(link + i + '.xls', response => {
            if(response.statusMessage == 'OK' && x == true){
                const file = fs.createWriteStream(nameFile)
                response.pipe(file)
                console.log(i + ' getFileFromServer Save OK')
                x = false
            }
        })
        if(x == false){
            break
        } 
    }
}