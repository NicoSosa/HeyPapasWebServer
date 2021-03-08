import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { TypeServiceByIdReqModel, TypeServicesResModel } from '../models/typeServiceModels';
import { UserResModel } from '../models/usersModels';

class TypeServicesController {

    public getTypeServices(req: Request, res: Response) {
        const query = ` SELECT * FROM type_service_view WHERE actIndTypeService = true ORDER BY nameTypeService `;

        DATABASE.excQuery( query, (err: any, typeServices: TypeServicesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: typeServices
                });
            }
        });
    }

    public getTypeServiceById(req: Request, res: Response) {
        const dataReq: TypeServiceByIdReqModel = req.body;
        const query = ` SELECT * FROM type_service_view WHERE actIndTypeService = true AND idTypeService = ${dataReq.idTypeService} `;

        DATABASE.excQuery( query, (err: any, typeServices: TypeServicesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: typeServices
                });
            }
        });
    }

    public newTypeService(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'nameTypeService'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'type_services_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);
        
        DATABASE.excQuery( query, (err: any, typeServices: TypeServicesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El tipo de servicio se ha creado.`,
                    data: typeServices
                });
            }
        });
    }

    public deleteTypeService(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idTypeService'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'type_services_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, typeServices: TypeServicesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El tipo de servicio se ha eliminado.`,
                    data: typeServices
                });
            }
        });
    }

}

const typeServicesController = new TypeServicesController();
export default typeServicesController; 