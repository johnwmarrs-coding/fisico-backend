// SOCKET IO HANDLER (MIGHT BE MOVED LATER)
const User = require('./models/User');
const io = require("socket.io")({cors: {origin: '*'}});
const socketapi = {
    
};

io.on('connection', async (socket) =>{
    console.log('a user is connected')
    socket.emit('connection', 'connected');
  
    socket.on('introduction', msg=>{
      io.to(socket.id).emit('introduction', 'Hello ' + msg.username + ' this is the server');
      let temp_user = User.findOne({email: msg.username}).exec();
  
      if (temp_user != null) {
        // Save socket id to user
        User.findOneAndUpdate({email: msg.username}, {socket_id: socket.id}).exec();
        console.log('Socket ID for ' + msg.username + ' is ' + socket.id);
      }
  
    })
  })
  //app.set('socketio', io);
  socketapi.io = io

module.exports = socketapi;