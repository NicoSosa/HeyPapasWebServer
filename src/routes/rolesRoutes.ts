import { Router } from "express";

import rolesController from "../controllers/rolesController";
import authMiddleware from "../middlewares/auth";

class RolesRoutes {
  public router: Router = Router(); // creo una variable de clase que es un objeto que retorna el metodo Router de express

  constructor() {
    this.config();
  }

  config(): void {
    this.router.get("/", rolesController.getRoles);
    this.router.post("/byId", [authMiddleware.verifyToken, authMiddleware.verifyAdminRole], rolesController.getRoleById);
  }
}
const rolesRoutes = new RolesRoutes();
export default rolesRoutes.router;
