'use strict';

var WebSocket = require('ws');
var wsServer = new WebSocket.Server({ port: 1881 });

wsServer.on('connection', function (connection) {
  connection.on('message', function (message) {
    console.log('received: %s', message);
  });

  connection.send('something');
});
