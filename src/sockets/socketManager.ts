import OrdersSocket from './ordersSocket';

export default class SocketManager {
    private orderSocket = new OrdersSocket();

    setAllSockets( io: any, socket: any): void {
        this.orderSocket.setSocket(io, socket);
    }
}