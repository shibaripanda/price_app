export default function searchInfo(){
    baza.filter(item => (item[4].split(' ')).includes('Lite') && item[3] == '+')
    for (let i of result){
        console.log(i[0] + ': ' + i[4] + ' ' + i[5] + ' Price: ' + i[6])
    }  
}

