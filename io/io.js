// Chatroom

var numUsers = 0;
var ioSocket = function(io){
io.on('connection', function (socket) {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: "m",
    
      message: data
    });
     
  });

    // when the client emits 'remove furit', this listens and executes
  socket.on('remove furit', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('remove furit', {
    
      message: data
    });
      
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function () {
    // echo globally (all clients) that a person has connected
    
    socket.broadcast.emit('user joined', {
    
      // username: socket.username,
      //    numUsers: 0
      
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
};
module.exports=ioSocket;