import { Router } from 'express';

import filesController from '../controllers/filesController';
import authMiddleware from '../middlewares/auth';

class FilesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.post('/img/:type/',[authMiddleware.verifyToken, authMiddleware.verifyAdminRole], filesController.uploadImg );
        this.router.post('/img/:type/:cod',[authMiddleware.verifyToken, authMiddleware.verifyAdminRole], filesController.uploadImgByItemCod );
        // this.router.post('/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], filesController.newFile );
        // this.router.put('/update', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], filesController.updateFile );
        // this.router.put('/delete', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], filesController.deleteFile );
    }
}
const filesRoutes = new FilesRoutes();
export default filesRoutes.router;       