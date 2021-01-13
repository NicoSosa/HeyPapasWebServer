import { Response, Request } from 'express';

import _ from 'underscore';
import DATABASE from '../database/database';
import { ProductByIdReqModel, ProductResModel, ProductFinalResModel } from '../models/productsModel';
import { UserResModel } from '../models/usersModels';
import { PricesResModel } from '../models/pricesModels';

class ProductsController {

    
    public getProducts(req: Request, res: Response) {
        const query = ` SELECT * FROM product_view WHERE actIndProduct = true ORDER BY nameProduct`;

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: products
                });
            }
        });
    }

    public getProductsWithPrices(req: Request, res: Response) {
        const query = ` SELECT * FROM product_view WHERE actIndProduct = true ORDER BY nameProduct`;

        DATABASE.excQuery( query, (err: any, productsWithOutPrices: ProductResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                const productLength = productsWithOutPrices.length;
                let products: ProductFinalResModel[] = [];

                productsWithOutPrices.map( (product, index) => {
                    const query2 = ` SELECT * FROM product_with_prices_view WHERE actIndPrice = 1 AND idProduct = ${product.idProduct} `;
                    DATABASE.excQuery( query2, ( err: any, prices: PricesResModel[] ) => {
                        if ( err ) {
                            res.status(400).json({
                                ok: false, 
                                error: err,
                            });
                        } else {
                            products.push({
                                ...product,
                                prices
                            });
                        }
                        if( productLength === index + 1) {
                            res.json({
                                ok: true,
                                data: products
                            });
                        }
                    });
                });
            }
        });
    }

    public getProductById(req: Request, res: Response) {
        const dataReq: ProductByIdReqModel = req.body;
        const query = ` SELECT * FROM product_view WHERE actIndProduct = true AND idProduct = ${dataReq.idProduct}`;

        DATABASE.excQuery( query, (err: any, products: ProductResModel[]) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    data: products,
                });
            }
        });
    }

        

    public newProduct(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'nameProduct', 'description', 'state', 'urlImg', 'idCategory', 'idTrademark', 'idPackage'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'products_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El producto se ha creado.`,
                    data: products
                });
            }
        });
    }

    public updateAllProduct(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProduct', 'nameProduct', 'description', 'state', 'urlImg', 'idCategory', 'idTrademark', 'idPackage'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'products_updateAll';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El producto se ha modificado.`, 
                    data: products
                });
            }
        });
    }

    public updateOnlyProduct(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProduct', 'nameProduct', 'description', 'state', 'urlImg', 'idCategory', 'idTrademark'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'products_updateProd';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El producto se ha modificado.`,
                    data: products
                });
            }
        });
    }

    public updateStateProduct(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProduct', 'state'];
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'products_updateState';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El producto se ha modificado.`,
                    data: products
                });
            }
        });
    }

    public deleteProduct(req: Request, res: Response) {
        const pickerNew = ['nameUser', 'idProduct']; 
        const userReq: UserResModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerNew);
        
        const procedureName = 'products_delete';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, products: ProductResModel[] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                res.json({
                    ok: true,
                    msg: `El producto se ha eliminado.`,
                    data: products
                });
            }
        });
    }
    
}
const productsController = new ProductsController();
export default productsController; 