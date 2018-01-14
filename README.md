# stomp-ws-server

## 功能  

返回一个开发用的node服务器，主要提供功能为：  
1. 静态服务器功能  
2. 提供一个支持stomp协议websocket服务器  

## 开始使用  
### 安装
`npm install stomp-ws-server`
### 使用  
在项目根目录下，创建server.js文件，内容：
```
var StompServer = require('stomp-ws-server');
// 参数说明见config.js
var server = new StompServer({});
```
运行server.js文件：
`node server.js` 
  
即可在当前项目下运行一个服务器，模拟假数据的过程，可参照/example/index.html生成一个页面，专门用作上传假数据

## 工作过程  
### 说明：  
该服务器模拟的过程为，几个客户端建立一个房间，进入该房间的客户端之间可以同步通信：
1. 客户端发请求给服务器请求一个*roomId*， 同时上报自己的*客户端ID*；  
2. 服务器收到请求之后，返回一个*配置的*roomId给客户端，并将该 *客户端ID* 记录下来对应到roomId；  
3. 客户端收到roomId之后，发出websocket请求，与服务器建立长连接；  
4. 服务端收到请求并且*建立连接成功后*，在服务端订阅 roomId 的消息； 
5. 客户端收到建立长连接成功的消息后，订阅自己上传的 客户端ID， 并且将交互产生的信息发送给 服务器订阅的roomId；  
6. 订阅了roomId的 服务器收到来自客户端的消息之后，再将消息发送给roomId对应的 各个客户端ID；  

如上过程就完成了多个客户端之间的消息同步， 而如果客户端不产生交互信息的情况下，可以自己模拟假数据，定时发出


