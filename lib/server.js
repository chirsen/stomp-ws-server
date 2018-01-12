const http = require("http");
const url = require('url');
const StompServer = require('stomp-broker-js');
const node_static = require('./node-static');
const confige = require('../config.js');

const clients = [];

const static_directory = new node_static.Server(__dirname);
const server = http.createServer();
server.addListener('request', function(req, res) {
  const parseUrl = url.parse(req.url);
  const pathname = parseUrl.pathname;
  if(pathname === '/connect') {
    const queryStr = parseUrl.query;
    const uidEqul = queryStr.split('&').find(item => item.trim().indexOf('uid') === 0);
    const uid = uidEqul && uidEqul.split('=')[1];
    clients.push(uid);
    // 请求连接，解析出uid
    res.end(JSON.stringify({'roomId': confige.serverId}));
  } else {
    static_directory.serve(req, res);
  }
});
const stompServer = new StompServer({server: server});

server.listen(61614);

stompServer.subscribe(confige.serverId, function(msg, headers) {
  const topic = headers.destination;
  for(let i = 0; i < clients.length; i++) {
    console.log(clients[i]);
    stompServer.send(clients[i], {}, msg);
  }
  console.log( msg);
});