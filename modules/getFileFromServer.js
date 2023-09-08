import fs from "fs"
import fetch from "node-fetch"

export default async function getFileFromServerPogremuhi(nameFile, limit){
    return new Promise(async function(resolve, reject) {
        let date = new Date()
        for (let i = 0; i < limit; date.setDate(date.getDate() - 1)){
            console.log('Test: ' + date.toLocaleDateString().split('/').join('.'))
            const res = await fetch('http://www.pogremuhi.com/pricelist/' + date.toLocaleDateString().split('/').join('.') + '.xls')
            if(res.statusText == 'OK'){
                res.body.pipe(fs.createWriteStream(nameFile))
                console.log('Done!' + ' ' + date.toLocaleDateString())
                i = limit
                resolve('все окей')
            }
            i++
        }  
    })
}