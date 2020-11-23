import { Response, Request } from 'express';
import path from 'path';
import fs from 'fs';

class ImagesController {

    public getImage(req: Request, res: Response) {
        let tipo = req.params.type;
        let file = req.params.name;

        let pathImg = path.resolve(__dirname, `../../uploads/${ tipo }/${ file }`);
        // console.log(pathImg);
        if( fs.existsSync ( pathImg )) {
            res.sendFile( pathImg )
        }else{
            let noImgPath = path.resolve(__dirname,'../assets/noimage.jpg');
            res.sendFile(noImgPath);
        }
    }

    public deleteImage(req: Request, res: Response) {
        let arrayName = req.body.oldRoute.split('/');
        let type = arrayName[1];
        let file = arrayName[2];

        let pathImg = path.resolve(__dirname, `../../uploads/${ type }/${ file }`);
        if ( fs.existsSync( pathImg ) ){
            fs.unlinkSync( pathImg );
            res.json({
                ok: true, 
                msg: 'archivo borrado correctamente',
            });
        }
    }
}

const imagesController = new ImagesController();
export default imagesController; 