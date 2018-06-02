var request = require("request");
var https = require('https');
var qr = require('./quick_replies');
var api = require('./apiCalls');
var util = require('./utilfunctions');
var async = require('async');
var mysql = require("mysql");

//XML to json
// var querystring = require('querystring');
// var parseString = require('xml2js').parseString;

var connection = mysql.createConnection(process.env.DATABASE_URL);

var initRestaurantConv = function(event) {
  console.log('RUN initRestaurantConv');
  var task = [
    function(callback){
      var err;
      connection.query('UPDATE Users SET conv_context="initRestaurantRecommendation" WHERE user_id=' + event.sender.id);
      callback(null, err);
    },
    function(err, callback){
      var messageData = {"text": "왜 굶고다녀ㅠㅠ심심한데 메뉴 추천해줄까?", "quick_replies": qr.reply_arrays['YesOrNo']};
      api.sendResponse(event, messageData);
      callback(null);
    }
  ];
  async.waterfall(task);
};

var initRestaurantRecommendation = function(event) {
  console.log("RUN: initRestaurantRecommendation");
  if (event.message.text == "응"){
    console.log("USER SELECT : YES in initRestaurantConv");
    var task = [
      function(callback){
        connection.query('UPDATE Users SET conv_context="restaurantRecommendation_1" WHERE user_id=' + event.sender.id);
        callback(null, 'done');
      },
      function(err, callback){
        var qrCuisines = qr.generateQuickReplies(["한식", "중식", "일식", "양식", "분식"]);
        var messageData = {"text": "뭐 먹을래?", "quick_replies": qrCuisines};
        api.sendResponse(event, messageData);
        callback(null);
      }
    ];
    async.waterfall(task);
  } else if (event.message.text == "아니") {
    console.log("USER SELECT : NO in initRestaurantConv");

  } else {
    console.log("USER SELECT : UNEXPECTED RESPONSE in initRestaurantConv");
  }
};

var restaurantRecommendation_1 = function(event) {
  console.log("RUN: restaurantRecommendation_1");
  if (event.message.text == "한식" ||  "중식" || "일식" || "양식" || "분식") {
    console.log("USER SELECT : " + event.message.text + " in restaurantRecommendation_1");
    var search = "신촌" + event.message.text;
    console.log('SEARCH: ' + search);
  } else {
    console.log('UNVERIFIED SEARCH');
  }
  var naverClientID = 'mSdY16Cdgy3tfbILEmSN';
  var naverClientSecrete = 'EjgVHFWgzo';
  var options = { method: 'GET',
       // url: 'https://openapi.naver.com/v1/search/local.json'+'?query='+search+'&display=10&start=1&sort=sim',
      url : 'https://openapi.naver.com/v1/search/local.json',
      qs : {
        query : search,
        display : 1,
        start : 1,
        sort : "comment" // 리뷰 개수 순
      },
      headers: {
        'X-Naver-Client-Id':naverClientID,
        'X-Naver-Client-Secret': naverClientSecrete,
      },
  };

  var task = [
    function(callback){
      var err;
      connection.query('UPDATE Users SET conv_context="none" WHERE user_id=' + event.sender.id);
      callback(null, err);
    },
    function(err, callback){
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        //console.log(JSON.parse(body));
        console.log(JSON.parse(body).items);
        console.log("RECO RES TITLE: " + JSON.parse(body).items[0].title);
        console.log("RECO RES LINK: " + JSON.parse(body).items[0].link);
        console.log("RECO RES CATEGORY: " + JSON.parse(body).items[0].category);
        var title = JSON.parse(body).items[0].title;
        var url = JSON.parse(body).items[0].link;
        var category = JSON.parse(body).items[0].category;
        var titleMessage = "TITLE MESSAGE";
        var buttonMessage = "BUTTONMESSAGE";
        api.sendResponse(event, {'text' : "흠...오늘 메뉴는 " + JSON.parse(body).items[0].category + " 어때??"});
        if (url == '') {
          console.log('RESTAURANT URL DNE');
          url = 'http://www.example.com/'
          api.handleRestaurantWebview(event, titleMessage, url, buttonMessage);
        } else {
          console.log('RESTAURANT URL EXISTS');
          api.handleRestaurantWebview(event, titleMessage, url, buttonMessage);
        }
        api.sendResponse(event, {'text' : "신촌 주변 " + category + " 중 에서는" + title + util.getJosa(title, "가") +" 괜찮데:)"});
      });
      callback(null);
    },
  ];
  async.waterfall(task);
};


//function sortByCriterion(arr, criteria)

module.exports = {
  functionMatch: {
    "배고파": initRestaurantConv,
    "initRestaurantRecommendation" : initRestaurantRecommendation,
    "restaurantRecommendation_1" : restaurantRecommendation_1,
  }
};
