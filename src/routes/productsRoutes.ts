import {  Router } from 'express';

import productsController from '../controllers/productsController';
import authMiddleware from '../middlewares/auth';

class ProductsRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', productsController.getProducts );
        this.router.get('/withPrices', productsController.getProductsWithPrices );
        this.router.post('/byId', productsController.getProductById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], productsController.newProduct );
        this.router.put('/updateAll', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], productsController.updateAllProduct );
        this.router.put('/updateOnlyData', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], productsController.updateOnlyProduct );
        this.router.put('/updateState', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], productsController.updateStateProduct );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], productsController.deleteProduct );
    }
}
const productsRoutes = new ProductsRoutes();
export default productsRoutes.router;       