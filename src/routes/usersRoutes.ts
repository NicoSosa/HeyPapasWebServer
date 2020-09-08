import { Router } from 'express';

import usersController from '../controllers/usersController';
import authMiddleware from '../middlewares/auth';

class UsersRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.getUsers );
        this.router.post('/byId', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.getUserById );
        this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.newUser );
        this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.updateUser );
        this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.deleteUser );
    }
}
const usersRoutes = new UsersRoutes();
export default usersRoutes.router;       