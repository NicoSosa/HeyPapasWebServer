import { Router } from 'express';

import imagesController from '../controllers/imagesController';
import authMiddleware from '../middlewares/auth';

class ImagesRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/:type/:name', imagesController.getImage );
        this.router.put('/delete/', [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], imagesController.deleteImage );
        // this.router.post('/img/:type/:cod',[authMiddleware.verifyToken, authMiddleware.verifyAdminRole], imagesController.uploadImgByItemCod );
    }
}
const imagesRoutes = new ImagesRoutes();
export default imagesRoutes.router;       