'use strict';

$(document).ready(function () {
  window.WebSocket = window.WebSocket || window.MozWebSocket;

  var connection = new WebSocket('ws://127.0.0.1:1337');

  connection.onopen = function () {};
  connection.onerror = function (error) {};
  connection.onmessage = function (message) {};
});
