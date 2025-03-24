"use strict";
/**
 * CSV 파일을 읽어오고 파싱하는 예제
 */
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./lib/index");
const read = (0, index_1.readCSV)('./example.csv');
const parsedData = (0, index_1.parseCSV)(read);
