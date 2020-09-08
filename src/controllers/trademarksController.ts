import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { TrademarksResModel, TrademarkByIdReqModel } from '../models/trademarksModels';
import { userModel } from '../models/usersModels';

class TrademarksController {

    public getTrademarks(req: Request, res: Response) {
        const query = ` SELECT * FROM trademark_view WHERE actIndTrademark = true ORDER BY nameTrademark `;

        DATABASE.excQuery( query, (err: any, trademarks: TrademarksResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: trademarks
                });
            }
        });
    }

    public getTrademarkById(req: Request, res: Response) {
        const dataReq: TrademarkByIdReqModel = req.body;
        const query = ` SELECT * FROM trademark_view WHERE actIndTrademark = true AND idTrademark = ${dataReq.idTrademark} `;

        DATABASE.excQuery( query, (err: any, trademarks: TrademarksResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: trademarks
                });
            }
        });
    }

    public newTrademark(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'nameTrademark', 'descriptTrademark'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'trademarks_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, trademarks: TrademarksResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La marca se ha creado.`,
                    data: trademarks
                });
            }
        });
    }

    public updateTrademark(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idTrademark', 'nameTrademark', 'descriptTrademark'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'trademarks_update';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, trademarks: TrademarksResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La marca se ha modificado.`,
                    data: trademarks
                });
            }
        });
    }

    public deleteTrademark(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idTrademark'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'trademarks_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, trademarks: TrademarksResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `La marca se ha eliminado.`,
                    data: trademarks
                });
            }
        });
    }

}

const trademarksController = new TrademarksController();
export default trademarksController; 