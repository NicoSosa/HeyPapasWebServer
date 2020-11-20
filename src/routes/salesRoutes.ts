import { Router } from "express";

import salesController from "../controllers/salesController";
//import authMiddleware from "../middlewares/auth";

class RolesRoutes {
  public router: Router = Router(); // creo una variable de clase que es un objeto que retorna el metodo Router de express

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", salesController.getAllSales);
    this.router.post("/", salesController.getSales);
    this.router.get("/idLastSale", salesController.getIdLastSale);

    this.router.post("/prueba", salesController.prueba);
    //this.router.post("/byId", [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], rolesController.getRoleById);
  }
}
const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
