// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


//create server and listening at prot 3000
server.listen(port, () =>{
    console.log('server 監聽緊 port %d', port)
});

//app.use（[path]，callback，[callback])
//Routing
app.use(express.static(path.join(__dirname, 'things')));

//chatApp

var userNumber = {};

io.on('connection', function(socket){
    //尚有人連接時，向所有用戶發送消息
    socket.on('new-user', user_name =>{
        userNumber[socket.id] = user_name;
        console.log(userNumber);
        socket.broadcast.emit('user-connected', user_name);  //所有有連線的人都會收到，但發送者不會
        //io.emit('user-connected', theNmae); 
    });

    socket.on('chat message', function(msg){
        //console.log(word_id[socket.id]);
        socket.broadcast.emit('chat-message', { name : msg.name, msg : msg.message });
    });

    socket.on('disconnect', function(user_name){
        io.emit('disconnect', userNumber[socket.id])
        //console.log('deleting', userNumber[socket.id])
        delete userNumber[socket.id]
        //console.log(userNumber)
    });


});
