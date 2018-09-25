var io = require('socket.io')(server);
var redis = require('redis');
var client = redis.createClient(process.env.REDIS_URL);
var game_id = 1;
var game_key = {};

io.sockets.on('connection', function (socket) {
  
  // connected game client
  socket.on("gameConnected", async token => {
    const game_data = JSON.stringify({
      'socket_id': socket.id,
      'game_id': game_id++,
    });
    await client.set(token, game_data);
    game_key[token] = socket.id;
    socket.emit('gameConnectNotice', { 'socket_id': socket.id });
    console.log(`game : ${socket.id} connected`);
  });

  socket.on("playerConnected", async token => {
    if (game_key[token]) {
      socket.emit('playerConnectNotice', { 'socket_id': game_key[token] });
      socket.to(game_key[token]).emit('playerAddNotice', { 'player_socket_id': socket.id });
      console.log(`player : ${socket.id} connected`);
    } else {
      console.log('idがありません');
      socket.emit('playerConnectNotice', { 'socket_id': false });
    }
  })

  socket.on("playerAction", function (socket_id, data) {
    socket.to(socket_id).emit('playerActionNotice', { 'player_socket_id': socket.id, 'message': data });
    //console.log(`player ${socket.id} action`);
  });

});
