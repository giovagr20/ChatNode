const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const app = express();


const server = http.createServer(app);
const io = socketio.listen(server) //Los servers iniciados en tiempo real

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));

require('./sockets')(io);



//SERVER RUN
server.listen(app.get('port'),(req, res)=>{
    console.log(`Server running on port: ${app.get('port')}`);
});