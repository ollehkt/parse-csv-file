// src/lib/readCSV.ts
import * as fs from "fs";
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
export {
  parseCSV_default as parseCSV,
  readCSV_default as readCSV
};
//# sourceMappingURL=index.js.map
