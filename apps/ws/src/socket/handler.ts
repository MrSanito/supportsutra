// src/socket/handlers.js
const EVENTS = require("./events");


function registerHandlers(io, socket) {
  socket.on(EVENTS.CHAT_MESSAGE, (data) => {
    console.log("Message:", data);

    // broadcast to all
    io.emit(EVENTS.CHAT_MESSAGE, {
      text: data,
      sender: socket.id,
    });
  });
}

module.exports = { registerHandlers };

