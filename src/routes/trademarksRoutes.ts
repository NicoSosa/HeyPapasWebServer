import { Router } from 'express';

import trademarksController from '../controllers/trademarksController';
import authMiddleware from '../middlewares/auth';

class TrademarksRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', trademarksController.getTrademarks );
        this.router.post('/byId', trademarksController.getTrademarkById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], trademarksController.newTrademark );
        this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], trademarksController.updateTrademark );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], trademarksController.deleteTrademark );
    }
}
const trademarksRoutes = new TrademarksRoutes();
export default trademarksRoutes.router;       