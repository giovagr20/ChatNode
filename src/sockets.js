module.exports = function(io){

    let nicknames = {};

    io.on('connection', socket => {
    console.log('new user connected');

    
    socket.on('new user', (data, cb)=>{
        //console.log(data);
        if(data in nicknames){
            cb(false);
        }
        else{
            cb(true);
            
            socket.nickname = data;
            nicknames[socket.nickname] = socket;
            updateNicknames();
            
        }

    });

    socket.on('send message', (data, cb)=>{
        
        var msg = data.trim();

        if(msg.substr(0,1)=== '@'){
            msg = msg.substr(1);
            const index = msg.indexOf(' ');
            if(index !== -1){
               var name = msg.substring(0, index);
               var msg= msg.substring(index + 1);
               if(name in nicknames){
                   nicknames[name].emit('whisper', {
                       msg,
                       nick: socket.nickname
                   });
               } else{
                   cb('Error! Please enter a valid user');
               }
            }else{
                cb('Error! Please enter your message');
            }
        }else{
        //io todos los usuarios conectados
        io.sockets.emit('new message', {
            msg: data,
            nick: socket.nickname
        });
    }
    });

    socket.on('disconnect', data=>{
        if(!socket.nickname) return;
        delete nicknames[socket.nickname];
        logoutUser();
        logoutUserFront();
    });

    function logoutUserFront(){
        io.sockets.emit('logout', Object.keys(nicknames));
    }
    function logoutUser(){
        io.sockets.emit('exit', socket.nickname);
    }

    function updateNicknames(){
        io.sockets.emit('usernames', Object.keys(nicknames));
        io.sockets.emit('username', socket.nickname);
    }      
    
});
}