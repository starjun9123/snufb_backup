//quick_replies generator
var generateQuickReplies = function(arr){
  var arr = arr;
  if (arr.length > 11) {
    arr = arr.slice(0, 11);
    console.log("QR - Quick replies cannot be more than 11");
  }
  var quick_replies = []
  for (var i = 0; i < arr.length; i++) {
    var new_quick_replies = {
      "content_type": "text",
      "title": arr[i],
      "payload": arr[i],
    };
    quick_replies.push(new_quick_replies);
  }
  return quick_replies;
};

// commonly used quick replies
var YesOrNo = [{
  "content_type": "text",
  "title": "응",
  "payload": "응"
}, {
  "content_type": "text",
  "title": "아니",
  "payload": "아니"
}]

var Menu = [{
  "content_type": "text",
  "title": "선배한테 조언",
  "payload": "멘토"
},{
  "content_type": "text",
  "title": "좋은 사람 소개시켜줘",
  "payload": "소개팅"
},{
  "content_type": "text",
  "title": "미팅 잡아줘",
  "payload": "미팅"
},{
  "content_type": "text",
  "title": "기타",
  "payload": "기타"
}]

var Mentor_type = [{
  "content_type": "text",
  "title": "과 고학번 선배",
  "payload": "과선배"
},{
  "content_type": "text",
  "title": "취업 선배",
  "payload": "취업선배"
},{
  "content_type": "text",
  "title": "다른 선배",
  "payload": "query_demand1"
}]


var personSearchOptions = [{
  "content_type": "text",
  "title": "선배나 후배!",
  "payload": "선후배"
},{
  "content_type": "text",
  "title": "기타",
  "payload": "기타"
}]

var genderOptions = [{
  "content_type": "text",
  "title": "남성",
  "payload": "남성"
},{
  "content_type": "text",
  "title": "여성",
  "payload": "여성"
},{
  "content_type": "text",
  "title": "상관없어",
  "payload": "상관없어"
}]

module.exports = {
  generateQuickReplies : generateQuickReplies,
  reply_arrays: {
    "YesOrNo": YesOrNo,
    "Menu" : Menu,
    "Mentor_type": Mentor_type,
    "personSearchOptions": personSearchOptions,
    "genderOptions": genderOptions
  }
}
