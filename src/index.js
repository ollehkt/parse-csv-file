import { parseCSV, readCSV } from 'parse-csv-file/lib'

const read = readCSV('./example.csv')

const result = parseCSV(read)

console.log(result)
