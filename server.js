// Require functions
const express = require('express');
const socket = require('socket.io');
//const Ball = require('./ball');
//const Boundary = require('./boundary');
//const Matter = require('matter-js/build/matter.js');
//const plinkogame = require('./PlinkoGame.js');
const messagecleaner = require('./MessageCleaner');
//const Plinko = require('./plinko');

const FPS = 60;

var moderator = {};

var mCleaner = new messagecleaner;
//var mPlinkoGame = new plinkogame;

// App setup
var app = express();
var server = app.listen(process.env.PORT || 3000, function(){
    console.log('listening for requests on port 4000,');
});

// Static files
app.use(express.static('public'));
app.use('/mod', express.static(__dirname + '/mod'))

// Socket setup & pass server
var io = socket(server);

// Array of all the players
var players = [];
var guesses = [];

var numberOfPlayers = 0;
var guessesLeft = 0;

function countdown(time) {
    let now = new Date(time).getSeconds();
    let i = setInterval(calc, 1000);

    function calc() {
        if (now >= 0) {
            io.sockets.emit('countdown', now);
            now--;
        } else {
            clearInterval(i);
            io.sockets.emit('countdown', "Timer done!");
        }
    }
}

countdown(30000);

// On a socket connection
io.on('connection', (socket) => {
    numberOfPlayers++;
    console.log('made socket connection', socket.id);

    // Handle chat event
    socket.on('chat', function(data) {
        //data.message = mCleaner.clean(data.message);
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });


    // Handle disconnect event
    socket.on('disconnect', function() {
        console.log('lost socket connection', socket.id);
        deletePlayer(socket.id);
        socket.broadcast.emit('logs', socket.username);
        numberOfPlayers--;
        io.sockets.emit('playerNum', numberOfPlayers);
    });

    socket.on('newPlayer', function(data) {
        socket.username = data.username;
        socket.broadcast.emit('enter-log', socket.username)
        players.push(newPlayer(data, socket.id));
    });

    
    socket.on('newGuess', function(data) {
        guesses.push(data);
        guessesLeft--;
        io.sockets.emit('newGuess', data.guess);
        if(guessesLeft === 0) {
            plinko.startGame();
        }
        console.log(guesses);
    });

    // Handle player mouse move
    socket.on('move', function(data) {
        io.sockets.emit('move', data);
    });
    
    io.sockets.emit('playerNum', numberOfPlayers);
});

// Returns a new player
function newPlayer(data, socket) {
    let player = {
        username: data.username,
        wins: 0,
        socketid: socket
    }
    return player;
}

// Deletes player at id
function deletePlayer(socket) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketid === socket) {
            players.splice(i, 1);
        }
    }
}


//-------------------- Game Loop --------------------\\
setInterval(function() {
    /* io.sockets.emit('update', {
        balls: {x: balls[0].x, y: balls.y}
    }); */
}, 1000 / FPS);
