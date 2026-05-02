// src/server.js
 import http from "http"
const { setupSocket } = require("./socket");
 

const server = http.createServer();

setupSocket(server);

server.listen(3003, () => {
  console.log("Server running on http://localhost:3003");
});
