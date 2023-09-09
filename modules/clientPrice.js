export default async function clientPrice(result){
    let text = '---'
    for(let i of result){
        let flag = '✅'
        if(i[3] == '-'){
            flag = '❌'
        }
        let priceStartBaks = i[6]
        let priceStart = Number(i[6]) * Number(process.env.KURS)
        let priceClient = 0

        if(i[0] == 'LCD'){
           if(priceStart < 100){
            priceClient = priceStart + 60
           }
           else if(priceStart > 99 && priceStart < 200){
            priceClient = priceStart + 80
           }
           else{
            priceClient = priceStart + 100
           }
        }


        text = text + '\n' + i[0] + '\n' + i[4] + '\n' + i[5] + '\n($' + priceStartBaks + ') ' + priceStart.toFixed(2) + ' ' + flag + ' ' + priceClient.toFixed(2) + ' бел.руб.\n'
    }
    return text
}