import express from "express";

import categorysRoutes from "./categorysRoutes";
import combosRoutes from "./combosRoutes";
import packagesRoutes from "./packagesRoutes";
import productsRoutes from "../routes/productsRoutes";
import trademarksRoutes from "../routes/trademarksRoutes";
import usersRoutes from "../routes/usersRoutes";
import rolesRoutes from "../routes/rolesRoutes";
import authRoutes from "../routes/authRoutes";

export default class Routes {
  setRoutes(app: express.Application): void {
    app.use("/auth", authRoutes);
    app.use("/categorys", categorysRoutes);
    app.use("/combos", combosRoutes);
    app.use("/packages", packagesRoutes);
    app.use("/products", productsRoutes);
    app.use("/trademarks", trademarksRoutes);
    app.use("/users", usersRoutes);
    app.use("/roles", rolesRoutes);
  }
}
