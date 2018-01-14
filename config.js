/**
 * 配置项
 * desination: 目的地，一个字符串，客户端将要把消息发送到何地，类似与房间号
 * clientName：客户端的自定义名字
 * interval: 发送假数据的时间间隔， 默认为1000毫秒
 * connectUrl:  客户端请求连接，上传uid和获取roomid的地址， 默认为 ‘/connect’
 * port： 	 服务器监听的接口， 默认为61614
 * username： 连接服务需要的用户名， 默认为 ‘mylogin’
 * password： 连接服务需要的密码， 默认为	‘mypasscode’
 * path： 连接websocket服务的地址，默认为 ‘/stomp’
 * dir: 静态服务器监听的文件夹
 */
module.exports = {
	desination: '/destination/roomId',  // 可以是任意的字符串
	clientName: 'uid',
	interval: 1000,
	connectUrl: '/connect',
	port: 61614,
	username: 'mylogin',
	password: 'mypasscode',
	path: '/stomp',
	dir: './'
};