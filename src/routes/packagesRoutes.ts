import { Router } from 'express';

import packagesController from '../controllers/packagesController';
import authMiddleware from '../middlewares/auth';

class PackagesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', packagesController.getPackages );
        this.router.post('/byId', packagesController.getPackageById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], packagesController.newPackage );
        this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], packagesController.updatePackage );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], packagesController.deletePackage );
    }
}
const packagesRoutes = new PackagesRoutes();
export default packagesRoutes.router;       