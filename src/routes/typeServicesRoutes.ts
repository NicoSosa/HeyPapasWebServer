import { Router } from 'express';

// import trademarksController from '../controllers/trademarksController';
import typeServicesController from '../controllers/typeServicesController';
import authMiddleware from '../middlewares/auth';

class TypeServicesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', typeServicesController.getTypeServices );
        this.router.post('/byId', typeServicesController.getTypeServiceById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], typeServicesController.newTypeService );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], typeServicesController.deleteTypeService );
    }
}
const typeServicesRoutes = new TypeServicesRoutes();
export default typeServicesRoutes.router;       