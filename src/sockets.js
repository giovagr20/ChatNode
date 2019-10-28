module.exports = function(io){

    let nicknames = [];

    io.on('connection', socket => {
    console.log('new user connected');

    socket.on('new user', (data, cb)=>{
        console.log(data);
        if(nicknames.indexOf(data) != -1){
            cb(false);
        }
        else{
            cb(true);
            socket.nickname = data;
            nicknames.push(socket.nickname);
        }

    });

    socket.on('send message', (data)=>{
        //io todos los usuarios conectados
        io.sockets.emit('new message', data);
    });


});
}