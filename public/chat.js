// Make socket connection
var socket = io.connect();

// Init Variables
var username;
var pockets = [];

function setup() {
    createCanvas(300, 300);
}

// Query DOM
var message = document.getElementById('message');
var btn = document.getElementById('send'); 
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var logs = document.getElementById('logs');
var playerNumber = document.getElementById('player-num');
var timer = document.getElementById('timer');
var p1 = document.getElementById('p1');
var p2 = document.getElementById('p2');
var p3 = document.getElementById('p3');
var p4 = document.getElementById('p4');
var p5 = document.getElementById('p5');
pockets.push(p1);
pockets.push(p2);
pockets.push(p3);
pockets.push(p4);
pockets.push(p5);

// Event Listeners
btn.addEventListener('click', function(){
    if (message.value !== '') {
        socket.emit('chat', {
            message: message.value,
            username: username
        });
        message.value = "";
    }
});

p1.addEventListener('click', function(){
    socket.emit('newGuess', {
        username: username,
        guess: "p1"
    });
    disableAllPockets();
});

p2.addEventListener('click', function(){
    socket.emit('newGuess', {
        username: username,
        guess: "p2"
    });
    disableAllPockets();
});

p3.addEventListener('click', function(){
    socket.emit('newGuess', {
        username: username,
        guess: "p3"
    });
    disableAllPockets();
});

p4.addEventListener('click', function(){
    socket.emit('newGuess', {
        username: username,
        guess: "p4"
    });
    disableAllPockets();
});

p5.addEventListener('click', function(){
    socket.emit('newGuess', {
        username: username,
        guess: "p5"
    });
    disableAllPockets();
});

// Check if user had pressed a button
message.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      btn.click();
    }
});

// Check if user is typing a message
message.addEventListener('keypress', function(){
    socket.emit('typing', username);
});

function disableAllPockets() {
    /* for (var i = 0; i < pockets.length; i++) {
        pockets[i].disabled = true;
    } */
}

// Ask for user name while it is not valid
do {
    username = prompt("Enter a user name...");
} while(username === null || username === "" || username.length > 8);

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
    output.scrollTop = output.scrollHeight;
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('logs', function(data){
    logs.innerHTML = '<p><em>' + data + ' has left the game</em></p>';
});

socket.on('enter-log', function(data){
    logs.innerHTML = '<p><em>' + data + ' has joined the game</em></p>';
});

socket.on('countdown', function(data){
    timer.innerHTML = data;
});

socket.on('ball', function(data){
    // Change ball pos
});

socket.on('newGuess', function(data) {
    switch (data) {
        case 'p1':
            p1.innerHTML = parseInt(p1.innerHTML) + 1;
        break;
        case 'p2':
            p2.innerHTML = parseInt(p2.innerHTML) + 1;
        break;
        case 'p3':
            p3.innerHTML = parseInt(p3.innerHTML) + 1;
        break;
        case 'p4':
            p4.innerHTML = parseInt(p4.innerHTML) + 1;
        break;
        case 'p5':
            p5.innerHTML = parseInt(p5.innerHTML) + 1;
        break;
        default:
            console.log("ERROR");
        break;
    }
});

socket.on('connect', function() {
    socket.emit('newPlayer', {
        username: username
    });
});

socket.on('move', function(data) {
    mousePos.x = data.x;
    mousePos.y = data.y;
});

socket.on('playerNum', function(data) {
    playerNumber.innerHTML = 'Players: ' + data;
});


socket.on('update', function(data) {
    for (let i = 0; i < data.balls.x.length; i++) {
        console.log(`Ball ${i} X: ${data.balls.x[i]} Y: ${data.balls.x[i]}`)
    }
});
