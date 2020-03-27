const getData = require('../server/fetch');
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
let intervals = {};
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
  console.log(request);
  const userId = getUniqueId();
  console.log((new Date()) + " Received a new connection from origin " + request.origin + ".");
  const connection = request.accept(null, request.origin);
  clients[userId] = connection;
  console.log("Connected: " + userId + " in " + Object.getOwnPropertyNames(clients));
  
  const getBuses = async (busId) => {
    try {
      const data = await getData(`https://api.tfl.gov.uk/line/${busId}/arrivals`);
      const message = {
        type: busId,
         data
      };
      connection.send(JSON.stringify(message));
    } catch (error) {
      console.log(error);
    }
  };
  
  connection.on('message', function(message) {
    const busId = JSON.parse(message.utf8Data).busId;
    intervals.userId = setInterval(getBuses, 120000, busId);
    getBuses(busId);
  });
  
  connection.on('close', function(connection) {
    console.log("CLOSED: " + (new Date()) + " Peer " + userId + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userId]} left the document`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    clearInterval(intervals.userId);
    sendMessage(JSON.stringify(json));
  });
});
