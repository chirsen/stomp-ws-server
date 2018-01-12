# stomp-ws-server
stomp websocket
首先发送请求到服务器（带clientId），获取clientId（roomId），根据当连接到roomId的，决定是用假数据还是使用实时数据
1. 发送clientId（uid）请求到path，请求连接
2. 服务端收到一个clientId，判断当前是否有其他客户端连接
    如果没有：用设置的serverId作为房间号，用clientIds作为其他的客户端，用mockData没interval时间间隔返回一次
    如果有：
3. 将已有的client订阅收到的消息，发送给新连接上的client