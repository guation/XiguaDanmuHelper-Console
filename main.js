var room="67771720063"
var https = require("https");
var AnchorID=0;
var Cursor=0;
httpget(1);
var abc=0;
var AipSpeechClient = require("baidu-aip-sdk").speech;

// 设置APPID/AK/SK
var APP_ID = "";
var API_KEY = "";
var SECRET_KEY = "";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);
function langdu(yuying){
	// 语音合成
	var fs = require('fs');
	// 语音合成, 附带可选参数
	client.text2audio(yuying, {vol: 3 , per: 4}).then(function(result) {
		if (result.data) {
			fs.writeFileSync('tmp/'+abc+'.mp3', result.data);
			bofang(abc);
			abc++;
		} else {
		 // 服务发生错误
		console.log(result)
		}
	}, function(e) {
		// 发生网络错误
	 	console.log(e)
	});
}

function sleep(milliSeconds){ 
    var StartTime =new Date().getTime(); 
    let i = 0;
    while (new Date().getTime() <StartTime+milliSeconds);
}

function bofang(a){
var cmd=require('node-cmd');
    cmd.get(
        'cmdmp3win.exe tmp/'+a+'.mp3',
    function(data){
        //console.log(data)
        }
    );
}

function httpget(http){
	var https = require('https');  
	var qs = require('querystring');  

	var http1="/api/room?anchorId="+room;
	var http2="/api/msg/list/"+AnchorID+"?AnchorID="+room+"&Cursor="+Cursor;

	var data = '';

	var content = qs.stringify(data);  

	var options = {  
		async: false,
		hostname: 'live.ixigua.com',  
		port: 443,  
		path: http?http1:http2,  
		method: 'GET'  
	};  

	var req = https.request(options, function (res) {  
		//console.log('STATUS: ' + res.statusCode);  
		//console.log('HEADERS: ' + JSON.stringify(res.headers));  
		res.setEncoding('utf8');  
		res.on('data', function (chunk) {  
			data+=chunk;
			//console.log(chunk);  
		}); 
		res.on('end', function () {  
			data=JSON.parse(data);
			httpdata(http,data);
			//console.log(data);  
		});   
	});  

	req.on('error', function (e) {  
		console.log('problem with request: ' + e.message);  
	});  

	req.end();  
}

function httpdata(http,data){
	if(http){
		AnchorID=data.data.id;
	}else{
		Cursor=data.data.Extra.Cursor;
	}
	if(data.data.LiveMsgs){
		for(i=0;i<data.data.LiveMsgs.length;i++){
			//console.log(data.data.LiveMsgs[i].Msg);
			if(data.data.LiveMsgs[i].Msg!=null && data.data.LiveMsgs[i].Msg.content!=undefined && data.data.LiveMsgs[i].Msg.user!=undefined){
				if(data.data.LiveMsgs[i].Msg.content==''){
					console.log(data.data.LiveMsgs[i].Msg.user.name+' join room.')
				}else{
					console.log(data.data.LiveMsgs[i].Msg.user.name+" : "+data.data.LiveMsgs[i].Msg.content);
					langdu(data.data.LiveMsgs[i].Msg.content);
				}
				sleep(100);
			} 
		}
	}else{
		sleep(100);
	}
	httpget(0);
}

