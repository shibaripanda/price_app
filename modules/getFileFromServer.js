import http from "http"
import fs from "fs"

export default function getFileFromServer(link, nameFile){
    const file = fs.createWriteStream(nameFile)
    http.get(link, response => response.pipe(file))
}