"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/lib/readCSV.ts
var fs = __toESM(require("fs"), 1);
var readCSV = (path) => {
  const data = fs.readFileSync(path, "utf8");
  return data;
};
var readCSV_default = readCSV;

// src/lib/parseCSV.ts
var parseCSV = (csvString) => {
  const lines = csvString.trim().split("\n");
  const headers = parseCSVLine(lines[0]);
  const result = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === "") continue;
    const values = parseCSVLine(lines[i]);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = autoDetectType(values[index]);
    });
    result.push(obj);
  }
  return result;
};
var parseCSVLine = (line) => {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
};
var autoDetectType = (value) => {
  if (value === void 0 || value === null || value === "") {
    return null;
  }
  const valueWithoutCommas = value.replace(/,/g, "");
  if (/^-?\d+$/.test(valueWithoutCommas)) {
    return parseInt(valueWithoutCommas, 10);
  } else if (/^-?\d+\.\d+$/.test(valueWithoutCommas)) {
    return parseFloat(valueWithoutCommas);
  } else if (valueWithoutCommas.toLowerCase() === "true") {
    return true;
  } else if (valueWithoutCommas.toLowerCase() === "false") {
    return false;
  } else if (valueWithoutCommas.toLowerCase() === "null") {
    return null;
  }
  try {
    const jsonCompatible = value.replace(/'/g, '"');
    if (jsonCompatible.startsWith("{") && jsonCompatible.endsWith("}") || jsonCompatible.startsWith("[") && jsonCompatible.endsWith("]")) {
      const parsed = JSON.parse(jsonCompatible);
      return parsed;
    }
  } catch (e) {
  }
  return value;
};
var parseCSV_default = parseCSV;

// src/index.ts
var read = readCSV_default("./example.csv");
var parsedData = parseCSV_default(read);
//# sourceMappingURL=index.cjs.map
