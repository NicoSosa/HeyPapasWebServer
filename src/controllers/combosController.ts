import { Response, Request } from 'express';
import _ from 'underscore';

import DATABASE from '../database/database';

import { ComboResModel, ComboFinalResModel, ProductOfComboResModel, ComboByIdReqModel } from '../models/combosModels';
import { userModel } from '../models/usersModels';

class CombosController {

    public getCombos(req: Request, res: Response) {
        const query = ` SELECT * FROM combo_view WHERE actIndCombo = true ORDER BY nameCombo`;

        DATABASE.excQuery( query, (err: any, combosWithOuthProds: ComboResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                const comboLength = combosWithOuthProds.length;
                let combos: ComboFinalResModel[] = [];

                combosWithOuthProds.map( (combo, index) => {
                    const query2 = ` SELECT * FROM product_of_combo_view WHERE idCombo = ${combo.idCombo} `;
                    DATABASE.excQuery( query2, (err: any, products: ProductOfComboResModel[] ) => {
                        if ( err ) {
                            res.status(400).json({
                                ok: false, 
                                error: err,
                            });
                        } else {
                            combos.push({...combo, products});
                        }
                        if( comboLength === index + 1) {
                            res.json({
                                ok: true,
                                data: combos
                            });
                        }
                    });
                });
            }
        });
    }

    public getComboById(req: Request, res: Response) {
        const dataReq: ComboByIdReqModel = req.body;
        const query = ` SELECT * FROM combo_view WHERE actIndCombo = true AND idCombo = ${dataReq.idCombo}`;

        DATABASE.excQuery( query, (err: any, comboWithOuthProds: ComboResModel[] ) => {
            if ( err ) {
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                const query2 = ` SELECT * FROM product_of_combo_view WHERE idCombo = ${dataReq.idCombo} `;
                    DATABASE.excQuery( query2, (err: any, products: ProductOfComboResModel[] ) => {
                        if ( err ) {
                            res.status(400).json({
                                ok: false, 
                                error: err,
                            });
                        } else {
                            res.json({
                                ok: true,
                                data: {
                                    ...comboWithOuthProds[0],
                                    products
                                }
                            })
                        }
                    });
            }
        });
    }


    public newCombo(req: Request, res: Response) {
        const pickerProduct = ['nameUser','idCombo','idProduct','quantity'];
        const productsToCombo: any[] = req.body.products;

        const pickerCombo = ['nameUser', 'nameCombo', 'descriptCombo', 'stateCombo', 'idImg', 'idCategory', 'idTrademark', 'idPackage', 'costWOIva', 'ivaCost', 'costWIva', 'profit', 'ppvWOIva', 'ivaPpv', 'ppvWIva'];
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
        const dataToSql = _.pick(sendData, pickerCombo);
        
        const procedureName = 'combos_new';
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, combosWithOutProd: any[][] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                const idCombo = combosWithOutProd[0][0].id_combo;
                const prodLength = productsToCombo.length;
                let combos: any[] = [];
                combos.push(combosWithOutProd[0]);


                productsToCombo.forEach( (product,index) => {
                    const dataToSql2 = _.pick({ nameUser: userReq.nameUser, idCombo, ...product }, pickerProduct);

                    const procedureName2 = 'combos_product_new';
                    const query2 = DATABASE.getQuery(procedureName2, dataToSql2);

                    DATABASE.excQuery( query2, (err: any, prodOfCombo: any ) => {
                        if ( err ) { 
                            res.status(400).json({
                                ok: false,
                                error: err,
                            });
                        } else {
                            combos.push(prodOfCombo);
                        }
                        if( prodLength === index + 1) {
                            res.json({
                                ok: true,
                                msg:'El combo se ha creado',
                                data: combos
                            });
                        }
                    })
                })

            }
        });
    }
    // public newProductOfCombo(req: Request, res: Response) {}
    public updateAllCombo(req: Request, res: Response) {
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};
            
        const pickerDeleteProduct = ['nameUser','idCombo'];
        const deleteDataToSql = _.pick(sendData, pickerDeleteProduct);
        const deleteProcedureName = 'combos_product_delete';
        const deleteQuery = DATABASE.getQuery(deleteProcedureName,deleteDataToSql);

        DATABASE.excQuery( deleteQuery, (err: any, combosWithOutProd: any[][] ) => {
            if ( err ) { 
                res.status(400).json({ 
                    ok: false,
                    error: err,
                });
            }
        });

        const pickerUpdateProduct = ['nameUser','idCombo','idProduct','quantity'];
        const productsToCombo: any[] = req.body.products;

        const pickerCombo = ['nameUser', 'idCombo', 'nameCombo', 'descriptCombo', 'stateCombo', 'idImg', 'idCategory', 'idTrademark', 'idPackage', 'idPrice','costWOIva', 'ivaCost', 'costWIva', 'profit', 'ppvWOIva', 'ivaPpv', 'ppvWIva'];
        const dataToSql = _.pick(sendData, pickerCombo);
        const procedureName = 'combos_updateAll'; 
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, combosWithOutProd: any[][] ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                });
            } else {
                // const idCombo = req.get('idCombo')
                const prodLength = productsToCombo.length;
                let combos: any[] = [];
                combos.push(combosWithOutProd[0]);


                productsToCombo.forEach( (product,index) => {
                    const dataToSql2 = _.pick({ ...sendData, ...product }, pickerUpdateProduct);

                    const procedureName2 = 'combos_product_new';
                    const query2 = DATABASE.getQuery(procedureName2, dataToSql2);

                    DATABASE.excQuery( query2, (err: any, prodOfCombo: any ) => {
                        if ( err ) { 
                            res.status(400).json({
                                ok: false,
                                error: err,
                            });
                        } else {
                            combos.push(prodOfCombo);
                        }
                        if( prodLength === index + 1) {
                            res.json({
                                ok: true,
                                msg:'El combo se ha modificado.',
                                data: combos
                            });
                        }
                    })
                })

            }
        });

    }
    public updateOnlyCombo(req: Request, res: Response) {
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};

        const pickerCombo = ['nameUser', 'idCombo', 'nameCombo', 'descriptCombo', 'stateCombo', 'idImg', 'idCategory', 'idTrademark'];
        const dataToSql = _.pick(sendData, pickerCombo);
        const procedureName = 'combos_updateCombo'; 
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, combo: any ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                }); 
            } else {
                res.json({
                    ok: true,
                    msg:'El combo se ha modificado.',
                    data: combo
                });
            }
        });

    }
    public updateStateCombo(req: Request, res: Response) {
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};

        const pickerCombo = ['nameUser', 'idCombo', 'stateCombo'];
        const dataToSql = _.pick(sendData, pickerCombo);
        const procedureName = 'combos_updateState'; 
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, combo: any ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                }); 
            } else {
                res.json({
                    ok: true,
                    msg:'El combo se ha modificado.',
                    data: combo
                });
            }
        });
    }

    public deleteCombo(req: Request, res: Response) {
        const userReq: userModel = (<any>req).user;
        const sendData = { 
            nameUser: userReq.nameUser,
            ...req.body};

        const pickerCombo = ['nameUser', 'idCombo', 'idPrice'];
        const dataToSql = _.pick(sendData, pickerCombo);
        const procedureName = 'combos_delete'; 
        const query = DATABASE.getQuery(procedureName,dataToSql);

        DATABASE.excQuery( query, (err: any, combo: any ) => {
            if ( err ) { 
                res.status(400).json({
                    ok: false,
                    error: err,
                }); 
            } else {
                res.json({
                    ok: true,
                    msg:'El combo se ha eliminado.',
                    data: combo
                });
            }
        });
    }

}

const combosController = new CombosController();
export default combosController; 