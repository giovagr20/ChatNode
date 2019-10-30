const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const app = express();

const mongoose = require('mongoose');
const URI = 'mongodb://localhost/NodeChat';

const server = http.createServer(app);
const io = socketio.listen(server) //Los servers iniciados en tiempo real

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

require('./sockets')(io);

//db connection
mongoose.connect(URI, 
    {useNewUrlParser: true,
     useUnifiedTopology: true})
.then(db=>console.log('DB Connected'))
.catch(err => console.log(err));

//SERVER RUN
server.listen(app.get('port'),(req, res)=>{
    console.log(`Server running on port: ${app.get('port')}`);
});