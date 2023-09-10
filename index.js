import 'dotenv/config'
// console.log(process.env) 
import getFileFromServerPogremuhi from "./modules/getFileFromServer.js"
import xlcToJson from "./modules/xlcToJson.js"
import searchInfo from "./modules/searchInfo.js"
import clientPrice from "./modules/clientPrice.js"
import clientPriceBut from "./modules/clientPriceBut.js"
import { Telegraf, Markup } from "telegraf"
// 503091630
const bot = new Telegraf(process.env.BOT_TOKEN)
// console.log(async() => await await bot.delete_webhook({'drop_pending_updates': true}))
const option = {allowedUpdates: ['chat_member', 'callback_query', 'message', 'channel_post'], dropPendingUpdates: true}

let bazaPrice 

baza()
setInterval(()=>{
    baza()
}, 3600000)

bot.start(async (ctx) => {
    const keyboard = false
    await bot.telegram.sendMessage(ctx.chat.id, 'Привет', {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
})

bot.on('message', async (ctx) => {
    try{
        console.log('work')
        console.log(ctx.from.id + ' ' + ctx.from.username)
        if(bazaPrice !== undefined){
            const value = ctx.message.text.toLowerCase().replace(/ +/g, ' ').trim().split(' ')
            const result = await searchInfo(value, bazaPrice)
            console.log(result.length)
            if(result.length == 0){
                const keyboard = false
                await bot.telegram.sendMessage(ctx.chat.id, 'нет результатов', {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})

            }
            else{
               for(let i of await clientPriceBut(result)){
                console.log(i.but[1].slice(0, 21))
                    const keyboard = Markup.inlineKeyboard([
                        [Markup.button.callback(i.but[0], i.but[1])]
                ]) 
                await bot.telegram.sendMessage(ctx.chat.id, i.text, {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
                } 
            }  
        }
    }
    catch(e){           
        try{
            console.log(e)
            if(e.response.description == 'Bad Request: message is too long'){
                const keyboard = false
                await bot.telegram.sendMessage(ctx.chat.id, 'Задахуя результатов поиска', {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
            }
        }
        catch(e){
            console.log(e)
        }
    }
})

bot.on('callback_query', async (ctx) => {
    await ctx.answerCbQuery()
    let value = await ctx.update.callback_query.data
    let keyboard = false
    let model = /model/
    if(model.test(value.slice(0, 5))){
        const info = bazaPrice.filter(item => item[1] == value.split('|')[1])
        // 503091630
        // 59977373
        await bot.telegram.sendMessage('503091630 ', 'Уважаемый, Дедушка, возьмите эту диталю:\n' + info[0][0] + '\n' + info[0][4] + '\n' + info[0][5]+ '\n' + info[0][6] + '\n' + value.split('|')[2], {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
    }
})

function baza(){
getFileFromServerPogremuhi('./files/price.xls', 25)
  .then(
    res => {
        setTimeout(() => {
            console.log('ok'+ ' ' + res)
            xlcToJson('./files/price.xls')
              .then(res => bazaPrice = res)}, 3000) 
    },
    error => {
        console.log('no')}
   )
}

bot.launch(option)
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))




