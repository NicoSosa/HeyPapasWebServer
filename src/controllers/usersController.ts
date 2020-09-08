import { Response, Request } from 'express';
import DATABASE from '../database/database';

class UsersController {

    public getUsers(req: Request, res: Response) {}
    public getUserById(req: Request, res: Response) {}
    public newUser(req: Request, res: Response) {}
    public updateUser(req: Request, res: Response) {}
    public deleteUser(req: Request, res: Response) {}

}

const usersController = new UsersController();
export default usersController; 