import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { TypePriceByIdReqModel, TypePricesResModel } from '../models/typePriceModels';
import { UserResModel } from '../models/usersModels';

class TypePricesController {

    public getTypePrices(req: Request, res: Response) {
        const query = ` SELECT * FROM type_price_view WHERE actIndTypePrice = true ORDER BY nameTypePrice `;

        DATABASE.excQuery( query, (err: any, typePrices: TypePricesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: typePrices
                });
            }
        });
    }

    public getTypePriceById(req: Request, res: Response) {
        const dataReq: TypePriceByIdReqModel = req.body;
        const query = ` SELECT * FROM type_price_view WHERE actIndTypePrice = true AND idTypePrice = ${dataReq.idTypePrice} `;

        DATABASE.excQuery( query, (err: any, typePrices: TypePricesResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: typePrices
                });
            }
        });
    }

    public newTypePrice(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'nameTypePrice'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'type_prices_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, typePrices: TypePricesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El tipo de precio se ha creado.`,
                    data: typePrices
                });
            }
        });
    }

    public deleteTypePrice(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idTypePrice'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'type_prices_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, typePrices: TypePricesResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El tipo de precio se ha eliminado.`,
                    data: typePrices
                });
            }
        });
    }

}

const typePricesController = new TypePricesController();
export default typePricesController; 