/**
 * CSV 파일을 읽어오고 파싱하는 예제
 */

import { readCSV, parseCSV } from './lib/index'
const read = readCSV('./example.csv')

const parsedData = parseCSV(read)
