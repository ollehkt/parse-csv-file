/**
 * 범용적인 CSV 데이터를 파싱하여 JSON 객체 배열로 변환하는 함수
 * @param {string} csvString - CSV 형식의 문자열
 * @returns {Array} - 파싱된 객체 배열
 */
const parseCSV = (csvString: string) => {
  // 줄 단위로 분리
  const lines = csvString.trim().split('\n')

  // 첫 번째 줄은 헤더로 사용
  const headers = parseCSVLine(lines[0])

  // 결과를 저장할 배열
  const result = []

  // 각 줄을 처리
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue // 빈 줄 건너뛰기

    const values = parseCSVLine(lines[i])
    const obj: Record<string, any> = {}

    // 헤더와 값을 매칭하여 객체 생성
    headers.forEach((header, index) => {
      // 값의 타입을 자동으로 감지하여 변환
      obj[header] = autoDetectType(values[index])
    })

    result.push(obj)
  }

  return result
}

/**
 * CSV 한 줄을 파싱하는 헬퍼 함수 (따옴표로 묶인 콤마 처리)
 * @param {string} line - CSV 형식의 한 줄
 * @returns {Array} - 파싱된 값 배열
 */
const parseCSVLine = (line: string) => {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      // 따옴표 안에 있는 따옴표인 경우 (이스케이프된 따옴표)
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"'
        i++ // 다음 따옴표 건너뛰기
      } else {
        // 따옴표 상태 전환
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      // 콤마를 만나면 현재 값을 배열에 추가하고 초기화
      result.push(current)
      current = ''
    } else {
      // 일반 문자는 현재 값에 추가
      current += char
    }
  }

  // 마지막 값 추가
  result.push(current)

  return result
}

/**
 * 값의 타입을 자동으로 감지하여 적절한 타입으로 변환
 * @param {string} value - 변환할 값
 * @returns {any} - 변환된 값
 */
const autoDetectType = (value: string) => {
  if (value === undefined || value === null || value === '') {
    return null
  }

  // 콤마 제거 (숫자 형식)
  const valueWithoutCommas = value.replace(/,/g, '')

  // 정수 또는 실수 체크
  if (/^-?\d+$/.test(valueWithoutCommas)) {
    // 정수
    return parseInt(valueWithoutCommas, 10)
  } else if (/^-?\d+\.\d+$/.test(valueWithoutCommas)) {
    // 실수
    return parseFloat(valueWithoutCommas)
  } else if (valueWithoutCommas.toLowerCase() === 'true') {
    return true
  } else if (valueWithoutCommas.toLowerCase() === 'false') {
    return false
  } else if (valueWithoutCommas.toLowerCase() === 'null') {
    return null
  }

  // JSON 객체로 파싱 시도
  try {
    // 작은따옴표를 큰따옴표로 대체 (JSON 호환성)
    const jsonCompatible = value.replace(/'/g, '"')
    // 객체나 배열 형식인지 확인
    if (
      (jsonCompatible.startsWith('{') && jsonCompatible.endsWith('}')) ||
      (jsonCompatible.startsWith('[') && jsonCompatible.endsWith(']'))
    ) {
      const parsed = JSON.parse(jsonCompatible)
      return parsed
    }
  } catch (e) {
    // JSON 파싱 실패 시 원래 문자열 반환
    console.error(e)
  }

  return value
}

export default parseCSV
