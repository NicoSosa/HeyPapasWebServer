import { Router } from 'express';

import usersController from '../controllers/usersController';
import authController from '../controllers/authController';
import authMiddleware from '../middlewares/auth';

class AuthRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        // this.router.get('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], usersController.getUserByName );
        this.router.post('/', [], authController.getUserByName );
        this.router.post('/adminAccess', [], authController.getUserCode );
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;       