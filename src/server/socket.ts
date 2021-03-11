const socket_io = require ("socket.io");
const io = socket_io();

let Socket = {
    emit: (event: any, data: any) => {
        io.sockets.emit(event, data);
    }
}