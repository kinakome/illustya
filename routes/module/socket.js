var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end('server connected');
}).listen(8888);

var io = socketio.listen(server);

io.sockets.on('connection', function (socket) {
    var room = '';
    socket.on('client_to_server_join', function(data) {
        room = data.value;
        var roomInfo =io.sockets.server.nsps["/"].adapter.rooms[room]
        if(roomInfo != undefined){
            var roomMember =roomInfo.length
            if(roomMember >= 2){
                io.to(socket.id).emit('info',  {value : 'fail'})
            }else{
                socket.join(room);
                socket.broadcast.to(room).emit('server_to_client_stock', {stock : data.stock});
            }
        }else{
            socket.join(room);
            socket.broadcast.to(room).emit('server_to_client_stock', {stock : data.stock});
        }
    });

    socket.on('client_to_server', function(data) {
        io.to(room).emit('server_to_client', {stock : data.stock});
    });

    socket.on('client_to_server_exit', function() {
        socket.leave(room);
    });

    socket.on('client_to_server_my-stock', function(data) {
        socket.broadcast.to(room).emit('server_to_client_stock-callback', {stock : data.stock});
    });
});
