import { Response, Request } from 'express';
import DATABASE from '../database/database';

import { PricesbyComboId, PricesbyProdId, PriceById, PricesResModel, NewPriceReqModel } from '../models/pricesModels';
import { ProductSimpleWithPrice, ProductResModel } from '../models/productsModel';
import { ComboSimpleWithPrice } from '../models/combosModels';
import { UserResModel } from '../models/usersModels';

import _ from 'underscore';

class PricesController {

    public getPricesByProdId(req: Request, res: Response) {
        const dataReq: PricesbyProdId = req.body;
        const query = `SELECT * FROM product_with_prices_view WHERE actIndProduct = true AND idProduct = ${dataReq.idProduct}`;

        DATABASE.excQuery( query, (err: any, productWithPrices: ProductSimpleWithPrice[]) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: productWithPrices,
                });
            }
        });
    }

    public getPricesByComboId(req: Request, res: Response) {
        const dataReq: PricesbyComboId = req.body;
        const query = `SELECT * FROM combo_with_prices_view WHERE actIndCombo = true AND idCombo = ${dataReq.idCombo}`;

        DATABASE.excQuery( query, (err: any, comboWithPrices: ComboSimpleWithPrice[]) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: comboWithPrices,
                });
            }
        });
    }

    public getPriceById(req: Request, res: Response) {
        const dataReq: PriceById = req.body;
        const query = `SELECT * FROM price_view WHERE actIndPrice = true AND idPrice = ${dataReq.idPrice}`;

        DATABASE.excQuery( query, (err: any, prices: PricesResModel[]) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: prices,
                });
            }
        }); 
    }
    
    public newPrice(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProd', 'codProd', 'costWithOutIva', 'ivaCost', 'costWithIva', 'profit', 'ppvWOIva', 'ivaPpv', 'ppvWIva', 'state', 'idTypePrice'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = {
            nameUser: userReq.nameUser,
            ...req.body
        };

        const dataToSql = _.pick(sendData, pickerNew);
        const procedureName = 'prices_new';

        const query = DATABASE.getQuery(procedureName, dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El precio se ha modificado.`,
                    data: products
                });
            }
        });
    }

    public updatePrice(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProd', 'codProd', 'idPrice', 'costWithOutIva', 'ivaCost', 'costWithIva', 'profit', 'ppvWOIva', 'ivaPpv', 'ppvWIva', 'state', 'idTypePrice'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = {
            nameUser: userReq.nameUser,
            ...req.body
        };

        const dataToSql = _.pick(sendData, pickerNew);
        const procedureName = 'prices_update';

        const query = DATABASE.getQuery(procedureName, dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El precio se ha actualizado.`,
                    data: products
                });
            }
        });
    }
}

const pricesController = new PricesController();
export default pricesController; 