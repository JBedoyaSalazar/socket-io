/* global io */
/* global document */
/* global prompt */

const user = prompt('Ingrese su nombre de usuario');
const teacher = ['Platzi', 'Juan', 'Pedro', 'Maria'];

let socketNameSpace, group
const chat = document.getElementById('chat');
const nameSpace = document.getElementById('nameSpace');

if (teacher.includes(user)) {
    socketNameSpace = io('/teachers');
    group = 'teachers';
} else {
    socketNameSpace = io('/students');
    group = 'students';
}

socketNameSpace.on('connect', () => {
    nameSpace.innerHTML = `${group}`;
});

//Send Messages logic
const sendMessage = document.getElementById('sendMessage');
sendMessage.addEventListener('click', () => {
    const message = prompt('Ingrese su mensaje');
    socketNameSpace.emit('sendMessage', {
        message,
        user
    });
});

socketNameSpace.on('newMessage', (data) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
    chat.appendChild(li);
});