var http = require("http");
var url = require('url');
var fs = require('fs');
var StompServer = require('stomp-broker-js');
var express = require('express');
var app = express();
// 默认配置
var config = require('../config.js');

var clients = [];

var WsStompServer = function (myconfig) {
	// 自定义的参数覆盖默认配置
	config = Object.assign(config, myconfig);
	// 静态服务器
	var server = app.listen(config.port);

	app.use(express.static(config.dir));
	app.use('/', function(req, res, next){
		var parseUrl = url.parse(req.url);
		var pathname = parseUrl.pathname;
		// 对获取roomid的请求做处理
		if(pathname === config.connectUrl) {
			var queryStr = parseUrl.query;
			// 请求连接，解析出uid， 返回roomid
			res.end(JSON.stringify({'destination': config.desination}));
		}
		next();
	});

	// stomp
	var stompServer = new StompServer({
		server: server,
		path: config.path
	});

	stompServer.on('connected', function(sessionId, headers){
		// 
	});

	stompServer.on('subscribe', function(info){
		var clientId = info.topic;
		if(clientId && clientId !== config.desination && clients.indexOf(clientId) === -1) {
			clients.push(clientId);
		}
	});

	stompServer.on('error', function(error) {
		// 将订阅对象减少一个(错误对象)
		clients.splice(clients.length - 1, 1);
		return;
	});

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

	return  app;
};

module.exports = WsStompServer;
