var express = require('express');   //Framework providing enhanced webfeatures, etc.(framework)
var socket = require('socket.io');  //Socket I/O for seemless multiusers (library)
const fs = require('fs');           //To read file (library)
let obj = [];
var simulating = false;  //To prevent two different
let id;  //Value that increments through the data set

// App setup
var app = express();
var server = app.listen(4000, function () {
    console.log('Server is running. On port 4000');
});

//Acces work files from public folder
app.use(express.static('public'));


var io = socket(server);


io.on('connection', function (socket) { // Fires callback function when client connects
    if (simulating) {
        console.log('Simulating to new client...');
        generate();
    }

    else {
        console.log('Starting server simulation...');
        console.log('Simulating to first client connected');
        simulating = true;
        readMe();
    }
});

//Reads the file and parses everything into an object
function readMe() {
    console.log("Parsing JSON");
    obj = JSON.parse(fs.readFileSync('public/pd_calls.json', 'utf8')); //read file from pd_calls.json
    generate();
}

//Sends data to clients [every 5 seconds]
function generate() {
    io.sockets.emit('simulated-data', obj);
    console.log("Sending again...")
}





        //Change time to simulate
        // socket.on('changeTime', (data) => {
        //     console.log(data);
        //     clearTimeout(timeOut);
        //     time = data;
        //     readMe();
        // })