'use strict';

var history = [];
var users = [];

var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];

/******************
 * Chat functions *
 ******************/

function cleanHTMLEntities (str) {
  return String(str)
         .replace(/&/g, '&amp;').replace(/</g, '&lt;')
         .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function sendHistory (connection) {
  var data = JSON.stringify({
    type: 'history',
    data: history
  });

  connection.send(data);
}

/*****************************
 * WebSocketServer Callbacks *
 *****************************/

function onListening () {
  console.log((new Date()) + ' Server is listening on port ' + wsPort);
}

function onConnection (connection, request) {
  var ip = request.connection.remoteAddress;
  console.log((new Date()) + ' Connection from ' + ip + '.');

  if (history.length > 0) {
    sendHistory(connection);
  }

  users.push(connection);

  connection.on('message', function (message) {
    if (!connection.name) {
      connection.name  = cleanHTMLEntities(message);
      connection.color = colors.shift();

      var msg = JSON.stringify({
        type:'color',
        data: connection.color
      });
      connection.send(msg);

    } else {
      console.log((new Date()) + ' Received Message from ' + connection.name + ': ' + message);

      var record = {
        time   : (new Date()).getTime(),
        text   : cleanHTMLEntities(message),
        author : connection.name,
        color  : connection.color
      };
      history.push(record);
      history = history.slice(-20);
    }
  });

  connection.on('close', function () {
    console.log((new Date()) + " Peer " + ip + " disconnected.");

    if (connection.name && connection.color) {
      users.splice(users.indexOf(connection), 1);
      colors.push(connection.color);
    }
  });
}
