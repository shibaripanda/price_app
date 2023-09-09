import 'dotenv/config'
// console.log(process.env) 
import getFileFromServerPogremuhi from "./modules/getFileFromServer.js"
import xlcToJson from "./modules/xlcToJson.js"
import searchInfo from "./modules/searchInfo.js"
import { Telegraf, Markup } from "telegraf"

const bot = new Telegraf(process.env.BOT_TOKEN,  {"drop_pending_updates": "True"})
const option = {allowedUpdates: ['chat_member', 'callback_query', 'message', 'channel_post']}

let bazaPrice 

bot.start(async (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback(`✔️`, `openAc${ctx.from.id}`), Markup.button.callback(`555`, `errorAc${ctx.from.id}`)]
    ])
    await bot.telegram.sendMessage(ctx.chat.id, 'Привет', {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
})

bot.on('message', async (ctx) => {
    try{
        const value = ctx.message.text.toLowerCase().replace(/ +/g, ' ').trim().split(' ')
        const result = searchInfo(value, bazaPrice)
        let text = ctx.message.text.replace(/ +/g, ' ').trim() + '\n--------'
        for(let i of result){
            let flag = '✅'
            if(i[3] == '-'){
                flag = '❌'
            }
            text = text + '\n' + i[0] + '\n' + i[4] + '\n' + i[6] + ' ' + flag + '\n'
        }
        // console.log([...new Set(result.map(item => item[0]))])
        const keyboard = false

        await bot.telegram.sendMessage(ctx.chat.id, text, {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
    }
    catch(e){
        console.log(e)
        if(e.response.description == 'Bad Request: message is too long'){
            const keyboard = false
            await bot.telegram.sendMessage(ctx.chat.id, 'Задахуя результатов поиска', {...keyboard, protect_content: true, disable_web_page_preview: true, parse_mode: 'HTML'})
        }
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


baza()
setInterval(()=>{
    baza()
}, 3600000)

bot.launch(option)
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))




