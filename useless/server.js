var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
//var prompt = require('prompt');



app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.broadcast.emit('hi');

    socket.on('userjoined', function(showname){
        io.emit('userjoined', showname)
    })

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    }); 
})

io.emit('some event', { for: 'everyone' });


http.listen(3000, function(){
  console.log('listening on *:3000');
});