import { Router } from 'express';

// import trademarksController from '../controllers/trademarksController';
import ordersController from '../controllers/ordersController';
import authMiddleware from '../middlewares/auth';

class OrdersRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', [authMiddleware.verifyToken], ordersController.getOrders);
        this.router.get('/typeOrderStatus', ordersController.getTypeOrderStatus );
        // this.router.post('/byId', typeServicesController.getTypeServiceById );
        // this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], typeServicesController.newTypeService );
         this.router.post('/', [authMiddleware.verifyToken], ordersController.newOrder);
         this.router.post('/orderStatusById', [authMiddleware.verifyToken], ordersController.changeOrderStatusById);
         this.router.get('/kitchen', [authMiddleware.verifyToken], ordersController.getOrdersForKitchen);
         this.router.post('/kitchenById', [authMiddleware.verifyToken], ordersController.getOrdersForKitchenById);
         this.router.get('/cashCheck', [authMiddleware.verifyToken], ordersController.getOrdersForCashCheck);
    }
}
const ordersRoutes = new OrdersRoutes();
export default ordersRoutes.router;       