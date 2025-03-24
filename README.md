# parse csv file to Array

csv file을 자바스크립트 배열로 간편하게 변환 가능한 라이브러리입니다.

# Installation

```bash
npm install --save parse-csv-file
yarn install --save parse-csv-file
```

# Usage

```js
import { readCSV, parseCSV } from './lib/index'
const read = readCSV('./example.csv')

const parsedData = parseCSV(read)

// result
[
  {
    store_name: '공리',
    category: '중식당',
    new_open: '없음',
    rating: 4.54,
    visited_review: 1778,
    blog_review: 1059,
    store_id: 13150137,
    address: '서울 강남구 선릉로129길 24',
    business_hours: '수 11:00 - 22:00 21:30 라스트오더 /목 11:00 - 22:00 21:30 라스트오더 /금 11:00 - 22:00 21:30 라스트오더 /토 11:00 - 21:30 21:00 라스트오더 /일 11:00 - 21:30 21:00 라스트오더 /월 11:00 - 22:00 21:30 라스트오더 /화 11:00 - 22:00 21:30 라스트오더 /',
    phone_num: '0507-1319-7663',
    lat_lng: { x: 37.50247450814155, y: 127.04996016979987 }
  },
  {
    store_name: '연타발 압구정본점',
    category: '곱창,막창,양',
    new_open: '없음',
    rating: 4.42,
    visited_review: 980,
    blog_review: 1034,
    store_id: 13469576,
    address: '서울 강남구 도산대로 231',
    business_hours: '매일 11:30 - 22:00 /',
    phone_num: '02-545-4248',
    lat_lng: { x: 37.5215403, y: 127.0321571 }
  }
]

```
