// make connection from the client side
const socket = io(window.location.origin);

const message = document.getElementById('message'),
      name = document.getElementById('name'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      answer = document.getElementById('answer');
// ****************************************************************

// Add addEventListener to the button
// Emit the event (a message) to the server
btn.addEventListener("click", ()=>{
  socket.emit('message', {
    message: message.value,
    name: name.value
  });
  message.value ='';
})

// Add addEventListener "keypress"
// Emit the event (typing) to the server
message.addEventListener('keypress', function(){
    socket.emit('typing', name.value);
})

// Listen to receive a message from the server
socket.on('message', (data)=>{
  answer.innerHTML ='';
  output.innerHTML += '<p><strong>' + data.name + ': </strong>' + data.message + '</p>';
})

// Listen to receive a typing data from the server
socket.on('typing', function(data){
    answer.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
// // ****************************************************************
