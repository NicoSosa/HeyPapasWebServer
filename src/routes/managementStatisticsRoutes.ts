import { Router } from 'express';
import managementStatisticsController from '../controllers/managementStatisticsController';

class ManagementStatisticsRoutes {
    public router: Router = Router();  // creo una variable de clase que es un objeto que retorna el metodo Router de express

    constructor() {
        this.config();
    }

    config( ): void {
        this.router.get('/categorys', managementStatisticsController.getCategoryStatistics );
        this.router.get('/combos', managementStatisticsController.getComboStatistics );
        this.router.get('/packages', managementStatisticsController.getPackagesStatistics );
        this.router.get('/products', managementStatisticsController.getProductsStatistics );
        this.router.get('/trademarks', managementStatisticsController.getTrademarksStatistics );
        this.router.get('/typeServices', managementStatisticsController.getTypeServicesStatistics );
        this.router.get('/users', managementStatisticsController.getUsersStatistics );
    }
} 
const managementStatisticsRoutes = new ManagementStatisticsRoutes();
export default managementStatisticsRoutes.router;       