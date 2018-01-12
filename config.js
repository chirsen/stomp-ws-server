/**
 * 配置项
 * serverId: 服务端的一个订阅，对应的所有客户端将消息发送到该id，类似于房间号
 * mockData: 自定义假数据内容，固定时间间隔发送自定义的假数据到客户端（可指定已连接的特定的客户端， 如果不指定即发送给所有已连接客户端）
 * interval: 发送假数据的时间间隔
 */
module.exports = {
	serverId: 'roomId',
	mockData: [
		{	
			clientIds: ['uid1'], // 该部分数据发送给指定的客户端 不指定当前data会被发给所有已连接客户端
			data: {				 // 将被发送的数据
				"code":200, 
				"content": {
					"name":"keikei", 
					"percent":90
				}
			}
		}, {
			data: {
				"code":200, 
				"content": {
					"name":"keikei", 
					"percent":90
				}
			}
		}
	],
	interval: 10
};