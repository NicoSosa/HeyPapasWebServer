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
            data: "Contraseña o password invalidos",
          });
        }
      }
    });
  }
}

const rolesController = new AuthController();
export default rolesController;
