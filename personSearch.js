var request = require("request");
var https = require('https');
var qr = require('./quick_replies');
var api = require('./apiCalls');
var util = require('./utilfunctions');
var async = require('async');
var mysql = require("mysql");

var connection = mysql.createConnection(process.env.DATABASE_URL);

var startPersonSearch = function(event) {
  console.log('START PERSON SEARCH');
  var task = [
    function(callback) {
      connection.query('SELECT uid FROM Users WHERE user_id=' + event.sender.id, function(err, result, fields) {
        if (err) throw err;
        // console.log(result[0].uid);
        if (result[0].uid == 0)
        {
          console.log('Need to ask for profile URL');
          connection.query('UPDATE Users SET conv_context="askProfileURL" WHERE user_id=' + event.sender.id);
          api.sendResponse(event, {"text": "이 기능을 처음 사용하는구나! 먼저 너 프로필을 등록해야 하는데 이건 너의 도움이 조금 필요해!\n페이스북 앱에 들어가서 너 프로필 링크를 복사해줄 수 있어?\n사진을 참고해서 링크를 복사하고 여기에 붙여넣기 해줘!"});
          //NEED TO SEND 안내 PICTURE!!!

        } else //if (result[0].uid != 0)
        {
          console.log('No need to ask for profile URL');
          connection.query('UPDATE Users SET conv_context="personSearch_mainMenu" WHERE user_id=' + event.sender.id);
          api.sendResponse(event, {"text": "누구 찾아줄까?", "quick_replies": qr.reply.arrays["personSearchOptions"]});
        }
      });
      callback(null,'done');
    },
    function(err, callback) {

    callback(null);
    }
  ];
  async.waterfall(task);
};

function askProfileURL(event) {
  console.log('====ASKING FOR PROFILE URL====');
  var urlResponse = event.messege.text;
  var substring1 = "http";
  if (urlResponse.indexOf(substring1) !== -1) {
    api.sendResponse(event, {"text": "GOOD!"});
  }
};


module.exports = {
  functionMatch: {
    "사람찾기": startPersonSearch,
   "askProfileURL": askProfileURL,
  }
};
