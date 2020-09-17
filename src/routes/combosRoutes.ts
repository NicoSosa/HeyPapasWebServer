import { Router } from 'express';

import combosController from '../controllers/combosController';
import authMiddleware from '../middlewares/auth';

class CombosRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', combosController.getCombos );
        this.router.post('/byId', combosController.getComboById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], combosController.newCombo );
        this.router.put('/updateAll', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], combosController.updateAllCombo );
        this.router.put('/updateOnlyData', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], combosController.updateOnlyCombo );
        this.router.put('/updateState', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], combosController.updateStateCombo );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], combosController.deleteCombo );
    }
}
const combosRoutes = new CombosRoutes();
export default combosRoutes.router;       