var StompServer = require('../lib/server.js');

new StompServer({
	'path': '/mario/pandora-websocket',
	'desination': 'room001'
});
