var name = prompt("Enter your name:");
console.log(name);

var socket = io('localhost:8000', { transports: ["websocket"] });

var form = document.getElementById('send-container');
var messageInput = document.getElementById('messageInp');
var messageConatiner = document.querySelector('.container');

var append = (message, position) => {
    var messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    messageConatiner.lastChild.scrollIntoView();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});