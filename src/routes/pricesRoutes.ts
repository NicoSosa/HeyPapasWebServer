import { Router } from 'express';

import pricesController from '../controllers/pricesController';
import authMiddleware from '../middlewares/auth';

class PricesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.post('/byProdId', pricesController.getPricesByProdId );
        this.router.post('/byComboId', pricesController.getPricesByComboId );
        this.router.post('/byId', pricesController.getPriceById );
        this.router.post('/new', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], pricesController.newPrice );
        this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], pricesController.updatePrice );
    }
}
const pricesRoutes = new PricesRoutes();
export default pricesRoutes.router;       