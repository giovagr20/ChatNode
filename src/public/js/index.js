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
    const $catchnick = $('#catchnick');
    


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
                $('#catchnick').html(`<b>@${$nickname.val()} </b>`)
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
       socket.emit('send message', $messageBox.val(), data =>{
          $chat.append(`<p class="error">${data}</p>`);
       });
       $messageBox.val('');
    });

    socket.on('new message', function(data){
       displayMsg(data);
    });

    socket.on('exit', data=>{
       $chat.append(`<p> <i class="fas fa-sign-out-alt"></i> ${data} logout! <p><hr>`);
      
    });

    socket.on('logout', data=>{
        let html = '';
        for (let i=0; i< data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p><hr>`
        }
        $users.html(html);
    })

    socket.on('username', data=>{
        $chat.append(`<p> <i class="fas fa-sign-in-alt"></i> ${data} has joined! <p><hr>`);
    });
    socket.on('usernames', data=>{
        let html = '';
        for (let i=0; i< data.length; i++){
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p><hr>`
        }
        $users.html(html);
    });

    socket.on('whisper', data=>{
        $chat.append(`<p class="whisper"><i class="fas fa-at"></i><b>${data.nick}:</b> ${data.msg}</p><hr>`);

    });

    socket.on('load old msgs', msgs=>{
        for(let i=0;i<msgs.length;i++){
            displayMsg(msgs[i]);
        }
    });

    function displayMsg(data){
        $chat.append('<i class="fas fa-at"></i><b>' + data.nick + '</b>: ' + data.msg + '</br><hr>');
    }
})