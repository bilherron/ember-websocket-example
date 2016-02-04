var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
  console.log('CLIENT: Opened connection.');  
});

ws.on('message', function(data, flags) {
  console.log('CLIENT: Recieved data '+data);
});

ws.on('error', function(err) {
  console.log(err);
});
