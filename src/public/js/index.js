$(function(){
    const socket = io();

    //Get parts DOM from UI
    var $messageForm = $('#message-form');
    var $messageBox = $('#message');
    var $chat = $('#chat');

    //Obtaning DOM from nicknames
    const $nickForm = $('#nickForms');
    const $nickError = $('#nickError');
    const $nickname = $('#nickname');

    const $users = $('#usernames');

    $nickForm.submit(e =>{
        e.preventDefault();
        socket.emit('new user', $nickname.val(), data =>{
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger">
                That username already exists
                </div>
                `);
            }
            $nickname.val('');
        });

    });

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