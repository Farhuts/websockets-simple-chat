const express = require('express')
const socket = require('socket.io')
const app = express()

app.use(express.static("public"))

const server = app.listen(8080, function(){
  console.log("Listening on port 8080")
})

// Socket setup
// Listens for the server
const io = socket(server)

io.on("connection", (socket) => {
  console.log("made socket connection", socket.id)

// Listens for the message from the client and emits (sends) it to the clients
  socket.on("message", (data)=>{
    io.sockets.emit("message", data)
  })

// Listens for the typing from the client and broadcasts it to all the clients, except the sender
  socket.on('typing', function(data){
      socket.broadcast.emit('typing', data);
  });

// Listens to when someone leaves the chat
  socket.on('disconnect', (socket)=>{
    console.log("disconnected", socket.id)
  })
})
