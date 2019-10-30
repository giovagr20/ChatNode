const Chat = require('./models/models.chat');

module.exports = function(io){

    let nicknames = {};

    io.on('connection', async socket => {
    console.log('new user connected');

    let messages = await Chat.find({});
    socket.emit('load old msgs', messages);
    
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

    socket.on('send message', async(data, cb)=>{
        
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
        var newMsg = new Chat({
            msg,
            nick: socket.nickname
        });
        await newMsg.save();

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