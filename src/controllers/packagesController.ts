import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { PackagesResModel, PackageByIdReqModel } from '../models/packagesModels';
import { UserResModel } from '../models/usersModels';

class PackagesController {

    public getPackages(req: Request, res: Response) {
        const query = ` SELECT * FROM package_view WHERE actIndPackage = true ORDER BY namePackage `;

        DATABASE.excQuery( query, (err: any, packages: PackagesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: packages
                });
            }
        });
    }
    
    public getPackageById(req: Request, res: Response) {
        const dataReq: PackageByIdReqModel = req.body;
        const query = ` SELECT * FROM package_view WHERE actIndPackage = true AND idPackage = ${dataReq.idPackage} `;

        DATABASE.excQuery( query, (err: any, packages: PackagesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: packages
                });
            }
        });
    }
    public newPackage(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'namePackage', 'descriptPackage', 'idImg', 'cost_package', 'statePack'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'packages_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, packages: PackagesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El empaque se ha creado.`,
                    data: packages
                });
            }
        }); 
    }

    public updatePackage(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idPackage', 'namePackage', 'descriptPackage', 'idImg', 'cost_package', 'statePack'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'packages_update';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, packages: PackagesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El empaque se ha modificado.`,
                    data: packages
                });
            }
        });        
    }
    public deletePackage(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idPackage'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'packages_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, packages: PackagesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El empaque se ha eliminado.`,
                    data: packages
                });
            }
        });
    }

}

const packagesController = new PackagesController();
export default packagesController; 