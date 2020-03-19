

const http = require('http');
const webSocketServerPort = 8000;
const webSocketServer = require('websocket').server;
const server = http.createServer();
server.listen(webSocketServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

const clients = {};
const users = {};
let userActivity = [];
const getUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + "-" + s4();
};
const typesDef = {
  USER_EVENT: "userevent",
  CONTENT_CHANGE: "contentchange"
};
const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    clients[client].sendUTF(json);
  });
};

wsServer.on('request', function(request){
  const userId = getUniqueId();
  console.log((new Date()) + " Received a new connection from origin " + request.origin + ".");
  const connection = request.accept(null, request.origin);
  clients[userId] = connection;
  console.log("Connected: " + userId + " in " + Object.getOwnPropertyNames(clients));
  
  connection.on('message', function(message) {
    console.log('Received Message:', message.utf8Data);
    connection.sendUTF('Hi this is WebSocket server!');
  });

  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userId + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userId].username} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    sendMessage(JSON.stringify(json));
  });
});
