import { Router } from 'express';

import categorysController from '../controllers/categorysController';
import authMiddleware from '../middlewares/auth';

class CategorysRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', categorysController.getCategorys );
        this.router.post('/byId', categorysController.getCategoryById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], categorysController.newCategory );
        this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], categorysController.updateCategory );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], categorysController.deleteCategory );
    }
}
const categorysRoutes = new CategorysRoutes();
export default categorysRoutes.router;           