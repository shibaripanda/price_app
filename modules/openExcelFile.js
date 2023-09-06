import Excel from 'exceljs'

export default async function openExcelFile(fileLink){
    const workbook = new Excel.Workbook()
    await workbook.xlsx.readFile(fileLink)
    // console.log(workbook)
    const worksheet = workbook.getWorksheet(1)
    console.log(worksheet.getCell('A1').value)
    console.log(worksheet.getCell('B1').value)
    console.log(worksheet.getCell('C1').value)
}