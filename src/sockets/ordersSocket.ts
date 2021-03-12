import { OrderRowModel } from "../models/ordersModels";

export default class OrdersSocket {

    setSocket( io: any, socket: any): void {
        socket.on("new-order-created", (orderId: number) => {
        console.log("Orden N° " + orderId + " creada ");
    
        io.emit("new-order-created-detected", orderId);
        });
    
        socket.on("order-status-changed", (orderToChangeStatus: OrderRowModel) => {
        io.emit("order-status-changed-detected", orderToChangeStatus);
        });
    }
}