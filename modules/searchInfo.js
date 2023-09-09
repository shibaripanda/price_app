export default async function searchInfo(model, baza){
    let result = baza
    if(model[0] == '0'){
        for (let i = 1; i < model.length; i++){
            result = result.filter(item => (item[4].toLowerCase().replace(/ +/g, ' ').trim().replace(/,/g, ' ').split(' ')).includes(model[i]))
        }  
    }
    else{
        for (let i = 0; i < model.length; i++){
            result = result.filter(item => (item[4].toLowerCase().replace(/ +/g, ' ').trim().replace(/,/g, ' ').split(' ')).includes(model[i]) && item[0] == 'LCD')
        }  
    }
    
    return result 
}

