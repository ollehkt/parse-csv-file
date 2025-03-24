/**
 * 범용적인 CSV 데이터를 파싱하여 JSON 객체 배열로 변환하는 함수
 * @param {string} csvString - CSV 형식의 문자열
 * @returns {Array} - 파싱된 객체 배열
 */
declare const parseCSV: (csvString: string) => Record<string, any>[];
export default parseCSV;
