import { Response, Request } from 'express';

class FilesController {

    public uploadImg(req: Request, res: Response) {
        if (!req.files) return res.status(400).json({ ok: false, err: { msg: 'No se encontró el archivo que intenta subir' } });
        
        let fileKey    = req.files.fileKey;        // -> fileKey, es el nombre que le asignamos al archivo.. podria ser .foo o .archivo
        let fileNameArray = fileKey.name.split('.');  // -> devuelve un arreglo.
        let extention     = fileNameArray[fileNameArray.length - 1];   // -> busco la ult posición
        
        let type = req.params.type
        let version = new Date().getMilliseconds().toString();
        
        let validExtentions = ['png','jpg','gif','jpeg'];
        let validTypes = ['combo','package','product','user'];

        if ( validExtentions.indexOf( extention ) < 0) {
            return res.status(400).json({ ok: false, err: { msg: 'Extensión del archivo no válida' } });
        }

        if ( validTypes.indexOf( type ) < 0) {
            return res.status(400).json({ ok: false, err: { msg: 'El tipo no es válido.' } });
        }
        
        let route = `uploads/${type}/${version}-${fileKey.name}`;
        fileKey.mv(route).catch( err => {
            return res.status(400).json({ ok: false, error: err, msg: 'No se pudo subir correctamente el archivo.' });
        }).then( () => {
            res.json({
                ok: true, 
                msg: 'archivo cargado correctamente',
                data: route,
            });
        });
    }

    public uploadImgByItemCod(req: Request, res: Response) {
        if (!req.files) return res.status(400).json({ ok: false, err: { msg: 'No se encontró el archivo que intenta subir' } });
        
        let fileKey    = req.files.fileKey;        // -> fileKey, es el nombre que le asignamos al archivo.. podria ser .foo o .archivo
        let fileNameArray = fileKey.name.split('.');  // -> devuelve un arreglo.
        let extention     = fileNameArray[fileNameArray.length - 1];   // -> busco la ult posición
        
        let type = req.params.type;
        let cod  = req.params.cod;
        let version = new Date().getMilliseconds().toString();

        let validExtentions = ['png','jpg','gif','jpeg'];
        let validTypes = ['combo','package','product','user'];
        
        if ( validExtentions.indexOf( extention ) < 0) {
            return res.status(400).json({ ok: false, err: { msg: 'Extensión del archivo no válida' } });
        }

        if ( validTypes.indexOf( type ) < 0) {
            return res.status(400).json({ ok: false, err: { msg: 'El tipo no es válido.' } });
        }
        
        let route = `uploads/${type}/${cod}-${version}-${extention}`
        fileKey.mv(route).catch( err => {
            return res.status(400).json({ ok: false, err: { msg: 'No se pudo subir correctamente el archivo.' } });
        }).then( () => {
            res.json({
                ok: true, 
                msg: 'archivo cargado correctamente',
                data: route,
            });
        });        
    }
    
    public getCategoryById(req: Request, res: Response) {}
    public newCategory(req: Request, res: Response) {}
    public updateCategory(req: Request, res: Response) {}
    public deleteCategory(req: Request, res: Response) {}

}

const filesController = new FilesController();
export default filesController; 