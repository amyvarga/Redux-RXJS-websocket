/* const WebSocket = require("ws");

const url = "ws://localhost:8080";
const connection = new WebSocket(url);

connection.onopen = () => {
  connection.send("Message from client");
};

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`);
};

connection.onmessage = (e) => {
  console.log(e.data);
}; */

const clients = {};

const getUniqueId = () => {
  const s4 = () => Math.floor((1 + Math.random()) *0 * 10000).toString(16).substring(1);
  return s4() + s4() + "-" + s4();
};

wsServer.on('request', function(request){
  var userId = getUniqueId();
  console.log((new Date()) +"Received a new connection from origin " + request.prigin + ".");
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log("connected: " + userId + " in " + Object.getOwnPropertyNames(clients));
});