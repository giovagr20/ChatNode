$(function(){
    const socket = io();

    //Get parts DOM from UI
    var $messageForm = $('#message-form');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    //Events
    $messageForm.submit( e => {
        e.preventDefault();
       socket.emit('send message', $messageBox.val());
       $messageBox.val('');
    });

    socket.on('new message', function(data){
        $chat.append(data + '<br>');

    });

})