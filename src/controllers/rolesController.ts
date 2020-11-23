import { Response, Request } from "express";

import DATABASE from "../database/database";

import { RoleResModel, RoleByIdReqModel } from "../models/rolesModels";

class RolesController {
  public getRoles(req: Request, res: Response) {
    const query = ` SELECT * FROM role_view WHERE actIndRole = true ORDER BY descriptRole `;

    DATABASE.excQuery(query, (err: any, roles: RoleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: roles,
        });
      }
    });
  }

  public getRoleById(req: Request, res: Response) {
    const dataReq: RoleByIdReqModel = req.body;
    const query = ` SELECT * FROM role_view WHERE actIndRole = true AND idRole = ${dataReq.idRole}`;

    DATABASE.excQuery(query, (err: any, roles: RoleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: roles,
        });
      }
    });
  }
}
const rolesController = new RolesController();
export default rolesController;
