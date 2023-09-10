export default async function clientPriceBut(result){
    const arrZch = []
    let text
    let keyboard
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
        text = `<b>${i[0]}</b>` + '\n' + i[4] + '\n' + i[5] + '\n($' + priceStartBaks + ') ' + priceStart.toFixed(2) + ' ' + flag + ' ' + `<b>${priceClient.toFixed(2)}</b>` + ' бел.руб.\n'
        keyboard = [`Заказать`, `model|${i[1]}|${priceClient.toFixed(2)}`]
        arrZch.push({text: text, but: keyboard})

    }
    return arrZch
}