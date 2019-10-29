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
        if($nickname.val() == ''){
            $nickError.html(`
                <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i>You must enter an nickname
                </div>
                `);
        }else{
        socket.emit('new user', $nickname.val(), data =>{
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                <div class="alert alert-danger">
                <i class="fas fa-exclamation-triangle"></i>That username already exists
                </div>
                `);
            }
        
    
            $nickname.val('');
        });
    }

    });

    //Events
    $messageForm.submit( e => {
        e.preventDefault();
       socket.emit('send message', $messageBox.val());
       $messageBox.val('');
    });

    socket.on('new message', function(data){
        $chat.append('<i class="fas fa-portrait"></i><b>' + data.nick + '</b>: ' + data.msg + '</br><hr>');
    });

    socket.on('usernames', data=>{
        let html = '';
        for (let i=0; i< data.length; i++){
            html += `<p><i class="fas fa-user"></i>${data[i]}</p><hr>`
        }
        $users.html(html);
    })

})