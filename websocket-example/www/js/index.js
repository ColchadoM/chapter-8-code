'use strict';

// Color and name
var myColor = false;
var myName  = false;

// WebSocket
var wsURL = 'ws://127.0.0.1:1881';
var wsClient;

function setupWebSocket () {
  wsClient = new WebSocket(wsURL);

  wsClient.onopen = function () {
    $('#status').text('Choose name:');
  };

  wsClient.onerror = function (error) {
    $('#content').html('<p>Sorry, but there\'s some problem with your'
         + ' connection or the server is down.</p>');
  };

  wsClient.onmessage = function (message) {
    var messageStr = message.data;

    var message = JSON.parse(messageStr);
    var type = message.type;
    var data = message.data;
    console.log(message);

    if (type === 'color') {
      myColor = data;
      $('#status').text(myName + ': ').css('color', myColor);
      $('#input').focus();

    } else if (type === 'history') {
      for (var i = 0; i < data.length; i++) {
        addMessage(data[i].author, data[i].text, data[i].color, new Date(data[i].time));
      }
    } else if (type === 'message') {
      addMessage(data.author, data.text, data.color, new Date(data.time));
    }
  };
}

function onInputKeydown (event) {
  if (event.keyCode === 13) {
    var msg = $(this).val();
    if (!msg) {
      return;
    }

    wsClient.send(msg);
    $(this).val('');

    if (!myName) {
      myName = msg;
    }
  }
}

function addMessage(author, message, color, date) {
  var authorElem = '<span style="color:' + color + '">' + author + '</span>';
  var dateElem = ' @ ' + formatDate(date) + ' ';

  var p = document.createElement('p');
  $(p).html(authorElem + dateElem + message);

  $('#content').prepend(p);
}

function formatDate (date) {
  var hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  var mins  = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
  return hours + ':' + mins;
}

$(document).ready(function () {
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  setupWebSocket();

  $('#input').on('keydown', onInputKeydown);
});
