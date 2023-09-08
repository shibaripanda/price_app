export default function searchInfo(model, baza){
    let result = baza
    for (let i = 0; i < model.length; i++){
        result = result.filter(item => (item[4].toLowerCase().replace(/ +/g, ' ').trim().replace(/,/g, ' ').split(' ')).includes(model[i]) && item[0] == 'LCD')
    }
    return result 
}

