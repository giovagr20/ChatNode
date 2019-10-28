const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const app = express();


const server = http.createServer(app);
const io = socketio.listen(server) //Los servers iniciados en tiempo real

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets')(io);



//SERVER RUN
server.listen(3000,(req, res)=>{
    console.log('Server running on port: ' + 3000);
});