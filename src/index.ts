import Server from './server/server';
import DATABASE from './database/database';

const server = Server.init();

DATABASE.instance;

server.start();
server.sockets();