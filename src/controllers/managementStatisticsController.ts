import { Response, Request } from 'express';
import DATABASE from '../database/database';
import { categoryStatisticsResModel, packageStatisticsResModel, trademarkStatisticsResModel } from '../models/managementStatisticsModels';

class ManagementStatisticsController {

    public getCategoryStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS categoryCount FROM heypapasdb.categorys WHERE act_ind_category`;

        DATABASE.excQuery( query, (err: any, categorys: categoryStatisticsResModel ) => {
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

    
    public getComboStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS comboCount, COUNT(if (state = TRUE, 1, null)) AS comboActive,  COUNT(if (state = FALSE, 1, null)) AS comboInactive  FROM heypapasdb.combo_view WHERE actIndCombo = true;`;

        DATABASE.excQuery( query, (err: any, categorys: packageStatisticsResModel ) => {
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

    public getPackagesStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS packageCount FROM heypapasdb.packages WHERE act_ind_package;`;

        DATABASE.excQuery( query, (err: any, categorys: packageStatisticsResModel ) => {
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
    public getProductsStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS productCount, COUNT(if (state = TRUE, 1, null)) AS productActive,  COUNT(if (state = FALSE, 1, null)) AS productInactive  FROM heypapasdb.product_view WHERE actIndProduct = true;`;

        DATABASE.excQuery( query, (err: any, categorys: packageStatisticsResModel ) => {
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
    public getTrademarksStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS trademarkCount FROM heypapasdb.trademarks WHERE act_ind_trademark`;

        DATABASE.excQuery( query, (err: any, categorys: trademarkStatisticsResModel ) => {
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
    public getTypeServicesStatistics(req: Request, res: Response) {
        const query = `SELECT COUNT(*) AS typeServiceCount FROM heypapasdb.type_service_view WHERE actIndTypeService = TRUE;`;

        DATABASE.excQuery( query, (err: any, categorys: packageStatisticsResModel ) => {
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
    public getUsersStatistics(req: Request, res: Response) {
        const query = `SELECT count(*) AS userCount, COUNT(if (idUserRole = 2, 1, null)) AS userGuest,  COUNT(if (idUserRole = 3, 1, null)) AS userEmployee, COUNT(if (idUserRole = 4, 1, null)) AS userSupervisor, COUNT(if (idUserRole = 5, 1, null)) AS userAdministrator  FROM heypapasdb.user_view WHERE actIndUser = true AND idUserRole != 1`;

        DATABASE.excQuery( query, (err: any, categorys: packageStatisticsResModel ) => {
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

}

const managementStatisticsController = new ManagementStatisticsController();
export default managementStatisticsController; 