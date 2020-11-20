import express from "express";
import salesRoutes from "../routes/salesRoutes";
import afipRoutes from "../routes/afipRoutes";

export default class Routes {
  setRoutes(app: express.Application): void {
    app.use("/sales", salesRoutes);
    app.use("/afip", afipRoutes);
  }
}
