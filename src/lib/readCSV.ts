import * as fs from 'fs'

/**
 * CSV 파일을 읽어오는 함수
 * @param path - CSV 파일의 경로
 * @returns CSV 파일의 내용
 */

const readCSV = (path: string) => {
  const data = fs.readFileSync(path, 'utf8')
  return data
}

export default readCSV
