import { setInterval } from "timers";

var http = require("http");
var url = require('url');
var fs = require('fs');
var StompServer = require('stomp-broker-js');
var node_static = require('./node-static');
// 默认配置
var config = require('../config.js');

var clients = [];

var WsStompServer = function (myconfig) {
	// 自定义的参数覆盖默认配置
	config = Object.assign(config, myconfig);
	// 静态服务器
	var static_directory = new node_static.Server(config.dir || __dirname);	
	var server = http.createServer();
	var mockIndex = 0;
	var timmer = null;
	// 对获取roomid的请求做处理
	server.addListener('request', function(req, res){
		var parseUrl = url.parse(req.url);
		var pathname = parseUrl.pathname;
		if(pathname === config.connectUrl) {
			var queryStr = parseUrl.query;
			var uidEqul = queryStr.split('&').find(item => item.trim().indexOf(config.clientName) === 0);
			var uid = uidEqul && uidEqul.split('=')[1];
			clients.push(uid);
			// 请求连接，解析出uid， 返回roomid
			res.end(JSON.stringify({'destination': config.desination}));
		} else {
			static_directory.serve(req, res);
		}
	});
	// stomp
	var stompServer = new StompServer({
		server: server,
		path: config.path
	});
	// 监听指定端口
	server.listen(config.port);

	// 在每次对应的roomid频道收到消息时，转发给所有的订阅者
	stompServer.subscribe(config.desination, function(msg, headers) {
	  for(var i = 0; i < clients.length; i++) {
		// 如果时debug，打印每次的请求和消息
		if(config.debug) {
			console.log('header: \n' + headers);
			console.log('msg: \n' + msg);
		}
	    stompServer.send(clients[i], {'content-type': 'application/json'}, JSON.stringify({
			headers: headers,
			msg: msg
		}));
	  }
	});

	console.log('运行中……');
};

module.exports = WsStompServer;