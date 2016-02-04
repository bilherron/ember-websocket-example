var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 8080});

wss.on('connection', function(ws) {
  console.log('WEBSOCKET: Connection started.');

  sendMessage = true;
  
  ws.on('close', function() {
    console.log('WEBSOCKET: Connection stopped.');
    sendMessage = false;
  });

  function sendRandomNumberRandomly() {
    var time = Math.floor(Math.random()*2001) + 1000;
    console.log('WEBSOCKET: Sending number after '+time+' ms.');
    if(sendMessage) {
      setTimeout(function() {
        console.log('WEBSOCKET: Sending number '+time+'.\n');
        ws.send(JSON.stringify({number: time}), sendRandomNumberRandomly);
      }, time);
    }
  }
  
  sendRandomNumberRandomly();
});
