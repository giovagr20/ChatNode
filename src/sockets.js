module.exports = function(io){
    io.on('connection', socket => {
    console.log('new user connected');
    socket.on('send message', (data)=>{
        //io todos los usuarios conectados
        io.sockets.emit('new message', data);
    });
});
}