const socket = io("http://localhost:8000");

const form = document.getElementById("send-container");
const messageinput = document.getElementById("inputbox");
const messagecontainer = document.querySelector(".container");

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messagecontainer.append(messageElement);
};

const name = prompt("Enter your name to join chat");
socket.emit('new-user-joined', name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageinput.value = '';
})

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'left');
});

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left');
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'left');
})
