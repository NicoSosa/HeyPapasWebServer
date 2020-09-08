import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { CategoryResModel, CategoryByIdReqModel } from '../models/categorysModels';
import { userModel } from '../models/usersModels';

class CategorysController {

    public getCategorys(req: Request, res: Response) {
        const query = ` SELECT * FROM category_view WHERE actIndCategory = true ORDER BY nameCategory `;

        DATABASE.excQuery( query, (err: any, categorys: CategoryResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: categorys
                });
            }
        });
    }

    public getCategoryById(req: Request, res: Response) {
        const dataReq: CategoryByIdReqModel = req.body;
        const query = ` SELECT * FROM category_view WHERE actIndCategory = true AND idCategory = ${dataReq.idCategory}`;

        DATABASE.excQuery( query, (err: any, categorys: CategoryResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: categorys
                });
            }
        });
    }

    public newCategory(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'nameCategory', 'descriptCategory'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'categorys_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, categorys: CategoryResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La categoría se ha creado.`,
                    data: categorys
                });
            }
        });
    }

    public updateCategory(req: Request, res: Response) {
        const pickerUpdate = ['nameUser', 'idCategory','nameCategory', 'descriptCategory'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerUpdate);
        
        const procedureName = 'categorys_update';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, categorys: CategoryResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La categoría se ha modificado.`,
                    data: categorys
                });
            }
        });
    }

    public deleteCategory(req: Request, res: Response) {
        const pickerDelete = ['nameUser', 'idCategory'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerDelete);
        
        const procedureName = 'categorys_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, categorys: CategoryResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La categoría se ha eliminado.`,
                    categorys
                });
            }
        });
    }

}

const categorysController = new CategorysController();
export default categorysController; 