import express from "express";

import authRoutes from "../routes/authRoutes";
import categorysRoutes from './categorysRoutes';
import combosRoutes from './combosRoutes';
import imagesRoutes from './imagesRoutes';
import filesRoutes from './filesRoutes';
import packagesRoutes from './packagesRoutes';
import pricesRoutes from './pricesRoutes';
import productsRoutes from '../routes/productsRoutes';
import rolesRoutes from "../routes/rolesRoutes";
import managementStatisticsRoutes from './managementStatisticsRoutes';
import trademarksRoutes from '../routes/trademarksRoutes';
import typeServicesRoutes from './typeServicesRoutes';
import usersRoutes from '../routes/usersRoutes';

export default class Routes {

    setRoutes( app: express.Application ): void {
        app.use("/auth", authRoutes);
        app.use('/categorys',categorysRoutes);
        app.use('/combos',combosRoutes);
        app.use('/uploads',imagesRoutes);
        app.use('/files',filesRoutes);
        app.use("/managementStatistics", managementStatisticsRoutes);
        app.use('/packages',packagesRoutes);
        app.use('/prices',pricesRoutes);
        app.use('/products',productsRoutes);
        app.use("/roles", rolesRoutes);
        app.use('/trademarks',trademarksRoutes); 
        app.use('/typeServices',typeServicesRoutes);
        app.use('/users',usersRoutes);
    }
}
