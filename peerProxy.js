const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });

  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    connections.push(ws);

    function sendUserNumber() {
      const userNumber = connections.length;
      const data = JSON.stringify({ type:"userNumber", number:userNumber});
      connections.forEach(client => client.send(data));
    }

    sendUserNumber();

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
      const index = connections.indexOf(ws);
      if (index !== -1) {
        connections.splice(index, 1);
      }

      sendUserNumber();
    });

  });
}

module.exports = { peerProxy };
