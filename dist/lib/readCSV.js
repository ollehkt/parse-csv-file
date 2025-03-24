"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
/**
 * CSV 파일을 읽어오는 함수
 * @param path - CSV 파일의 경로
 * @returns CSV 파일의 내용
 */
const readCSV = (path) => {
    const data = fs.readFileSync(path, 'utf8');
    return data;
};
exports.default = readCSV;
