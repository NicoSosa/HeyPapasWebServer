import { Response, Request } from "express";

import DATABASE from "../database/database";

import { UserByNameReqModel, UserResModel } from "../models/usersModels";

import jwt from "jsonwebtoken";

class AuthController {
  public getUserByName(req: Request, res: Response) {
    const dataReq: UserByNameReqModel = req.body;
    const query = `SELECT * FROM user_view WHERE actIndUser = true AND nameUser = '${dataReq.nameUser}'`;
    console.log(query);

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        const userFromDB: UserResModel = user[0];

        if (userFromDB.passUser === req.body.passUser) {
          const seed: string = process.env.SEED ? process.env.SEED : "";
          const caducidadToken: string = process.env.CADUCIDAD_TOKEN
            ? process.env.CADUCIDAD_TOKEN
            : "";
          let token = jwt.sign(
            {
              user: {
                nameUser: userFromDB.nameUser,
                codUser: userFromDB.codUser,
                codUserRole: userFromDB.codUserRole,
                descriptUserRole: userFromDB.descriptUserRole,
              },
            },
            seed,
            { expiresIn: caducidadToken }
          );
          //, noTimestamp:true
          res.json({
            ok: true,
            data: token,
          });
        } else {
          res.json({
            ok: false,
            data: "Contraseña o nombre de usuario invalidos",
          });
        }
      }
    });
  }

  public getUserCode(req: Request, res: Response) {
    const dataReq: UserByNameReqModel = req.body;

    const query = `SELECT * FROM user_view WHERE actIndUser = true AND nameUser = '${dataReq.nameUser}'`;

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        const userFromDB: UserResModel = user[0];

        if (userFromDB.passUser === req.body.passUser) {
          const idUserRole: number = userFromDB.idUserRole;

          if (idUserRole === 1 || idUserRole === 4 || idUserRole === 5) {
            res.json({
              ok: true,
              data: userFromDB.codUser,
            });
          }else {
            res.status(401).json({
              ok: false,
              data: "No tienes permisos.",
            });
          }
        } else {
          res.json({
            ok: false,
            data: "Contraseña o nombre de usuario invalidos",
          });
        }
      }
    });
  }
}

const rolesController = new AuthController();
export default rolesController;
