const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 8080;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })

wss.on("connection", socket => {

  socket.on('message', message => {    
      wss.clients.forEach(client=> {
        if (client !== wss && client.readyState === WebSocket.OPEN) {
        client.send(message);
    }
      })
    });
});

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})