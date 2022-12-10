var express = require("express");
var app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var http = require('http');
var port = '8081';
var server = http.createServer(app);
const io = require('socket.io')(server);io.on('connection',(socket)=>{
  socket.on('join', function(data){
    socket.join(data.room);
    io.emit('new user joined', {user:data.user, message:'has joined  room.'});
  });
  socket.on('leave', function(data){
    io.emit('left room', {user:data.user, message:'has left room.'});
    socket.leave(data.room);
  });

 socket.on('message',function(data){
    io.in(data.room).emit('new message', {user:data.user, message:data.message});
  })
});
server.listen(port);
