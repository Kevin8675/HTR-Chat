var express = require('express');
var app = express();
var cors = require('cors');
var http = require('http');
var port = '8081';
var server = http.createServer(app);
app.use(cors());
app.get('/products/:id', function (req, res, next) {});
const io = require('socket.io')(server, {
  cors: {origin : '*'}
});
io.on('connection',(socket)=>{
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
