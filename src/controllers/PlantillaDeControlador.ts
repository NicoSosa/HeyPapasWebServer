import { Response, Request } from 'express';
import DATABASE from '../database/database';

class CategorysController {

    public getCategorys(req: Request, res: Response) {}
    public getCategoryById(req: Request, res: Response) {}
    public newCategory(req: Request, res: Response) {}
    public updateCategory(req: Request, res: Response) {}
    public deleteCategory(req: Request, res: Response) {}

}

const categorysController = new CategorysController();
export default categorysController; 