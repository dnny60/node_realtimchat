//import { Socket } from "dgram";

var user_name = 0;
var socket = io();
//<script>var name = prompt('hi')</script>

user_name = prompt('what is your fucking name??')
check_name = user_name
//$('#messages').append($('<li>').text(user_name));
socket.emit('new-user', user_name);


$(function(){
    $('#join').append($('<li>').text('你已連接'));
})


$(function () {
    var socket = io();
    $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', 
      {message : $('#m').val(),
       name : user_name}
       );
      $('#messages').append($('<li>').text('你 : ' + $('#m').val()));

      $('#m').val('');
      return false;
    });


    socket.on('chat-message', function(msg){
        $('#messages').append($('<li>').text(msg.name + ' : ' + msg.msg));
    });

    socket.on('user-connected', name =>{
        if (name == check_name){
            console.log(name + 'name = check_name');
        } else {
            $('#join').append($('<li>').text(name + " 已連接")); 
        };
    });
    socket.on('disconnect', name =>{
        
        //需要使用if 來避免傳回null

        if (name == null){
            return;
        } else {
            $('#join').append($('<li>').text(name + " 已斷線"));
        }
    
    });



  }); 