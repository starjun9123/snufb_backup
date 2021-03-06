var majorList = ["국어국문학과", "중어중문학과", "영어영문학과", "불어불문학과", "독어독문학과", "기독교학과", "철학과", "사학과", "미술사학과", "정치외교학과",
"행정학과", "경제학과", "문헌정보학과", "사회학과", "사회복지학과", "심리학과", "소비자학과", "커뮤니케이션·미디어학과", "여성학과", "아동학과",
"북한학과", "교육학과", "유아교육학과", "초등교육학과", "교육공학과", "특수교육학과", "영어교육학과", "사회과교육학과", "국어교육학과", "언어병리학과",
"법학과", "경영학과", "융합콘텐츠학과(구 디지털미디어학부)", "국사무학과", "음악치료학과", "수학과", "통계학과", "물리학과", "화학·나노과학과",
"생명과학과", "생명·약학부", "대학원행정실", "약학과", "약학대학행정실", "제약산업학과", "과학교육학과", "사범대학행정실", "수학교육학과",
"융합보건학과(구 보건관리학과)", "간호과학과", "간호대학행정실", "식품영양학과", "에코과학부", "학원행정실", "의과학과", "의과대학행정실",
"바이오융합과학과", "뇌·인지과학과", "컴퓨터공학과", "사이버보안학과", "전자전기공학과", "식품공학과", "화학신소재공학과", "건축학과",
"건축도시시스템공학과", "환경공학과", "기후·에너지시스템공학과", "휴먼기계바이오공학부", "예체능계열", "음악학부", "조형예술학부", "디자인학부",
"의류산업학과(구 의류학과)", "무용학과", "체육과학부(구 체육과학과)"];

const readline = require("readline");
const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
});

function printTest(majorList) {
  for (var i = 0; i < majorList.length; i ++) {
    console.log(majorList[i]);
  }
}

function checkSimilarity(majorList) {
  console.log("working");
  var rankList;
  var count = 0;
  for (var i = 0; i < majorList.length; i++) {
    count++;
  }
  console.log("count: " + count);
  console.log("majorList.length: " + majorList.length);
  for (var i = 0; i < majorList.length; i ++) {
    // majorList[i]
  }
}

rl.setPrompt("Your input: ");
rl.prompt();
rl.on("line", (data) => {
  if (data == "test") {
    // printTest();
    printTest(majorList);
    console.log(majorList.length);
  }
  if (data == "check") {
    // printTest();
    checkSimilarity(majorList);
  }
  console.log(data);
  rl.prompt();
});
