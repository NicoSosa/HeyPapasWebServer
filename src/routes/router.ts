import express from "express";
<<<<<<< HEAD
import salesRoutes from "../routes/salesRoutes";
import afipRoutes from "../routes/afipRoutes";

export default class Routes {
  setRoutes(app: express.Application): void {
    app.use("/sales", salesRoutes);
    app.use("/afip", afipRoutes);
  }
=======

import authRoutes from "../routes/authRoutes";
import categorysRoutes from './categorysRoutes';
import combosRoutes from './combosRoutes';
import imagesRoutes from './imagesRoutes';
import filesRoutes from './filesRoutes';
import packagesRoutes from './packagesRoutes';
import productsRoutes from '../routes/productsRoutes';
import rolesRoutes from "../routes/rolesRoutes";
import trademarksRoutes from '../routes/trademarksRoutes';
import usersRoutes from '../routes/usersRoutes';
export default class Routes {

    setRoutes( app: express.Application ): void {
        app.use("/auth", authRoutes);
        app.use('/categorys',categorysRoutes);
        app.use('/combos',combosRoutes);
        app.use('/uploads',imagesRoutes);
        app.use('/files',filesRoutes);
        app.use('/packages',packagesRoutes);
        app.use('/products',productsRoutes);
        app.use("/roles", rolesRoutes);
        app.use('/trademarks',trademarksRoutes); 
        app.use('/users',usersRoutes);
    }
>>>>>>> 929c1ce8e84d17cb8b8ca7d13ad0d2b02112648b
}
