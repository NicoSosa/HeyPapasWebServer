import { Router } from "express";

import afipController from "../controllers/afipController";
//import authMiddleware from "../middlewares/auth";

class AfipRoutes {
  public router: Router = Router(); // creo una variable de clase que es un objeto que retorna el metodo Router de express

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/cuit", afipController.getAfipDates);
    this.router.post("/facturaByCae", afipController.getAfipVoucherByCae);
    this.router.post("/facturar", afipController.newAfipVoucher);
  }
}
const afipRoutes = new AfipRoutes();
export default afipRoutes.router;
