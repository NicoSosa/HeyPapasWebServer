import { Router } from 'express';

// import trademarksController from '../controllers/trademarksController';
import typePricesController from '../controllers/typePricesController';
import authMiddleware from '../middlewares/auth';

class TypePricesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', typePricesController.getTypePrices );
        this.router.post('/byId', typePricesController.getTypePriceById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], typePricesController.newTypePrice );
        // this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], typePricesController.deleteTrademark );
    }
}
const typePricesRoutes = new TypePricesRoutes();
export default typePricesRoutes.router;       