import { Response, Request } from "express";
import DATABASE from "../database/database";
import _ from "underscore";

import { UserResModel, UserByIdReqModel } from "../models/usersModels";

class UsersController {
  public getUsers(req: Request, res: Response) {
    const query = ` SELECT * FROM user_view WHERE actIndUser = true ORDER BY nameUser `;

    DATABASE.excQuery(query, (err: any, users: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: users,
        });
      }
    });
  }

  public getUserById(req: Request, res: Response) {
    const dataReq: UserByIdReqModel = req.body;
    const query = ` SELECT * FROM user_view WHERE actIndUser = true AND idUser = ${dataReq.idUser}`;

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: user,
        });
      }
    });
  }

  public newUser(req: Request, res: Response) {
    const pickerNew = [
      "_nameUser",
      "nameUser",
      "passUser",
      "idUserRole",
      "actIndUser",
      "avatarUrl",
    ];
    const userReq: UserResModel = (<any>req).user;
    const sendData = {
      _nameUser: userReq.nameUser,
      ...req.body,
    };
    const dataToSql = _.pick(sendData, pickerNew);
    const procedureName = "users_new";
    const query = DATABASE.getQuery(procedureName, dataToSql);

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          msg: `Nuevo usuario fue creado.`,
          data: user,
        });
      }
    });
  }

  public updateUser(req: Request, res: Response) {
    const pickerUpdate = [
      "_nameUser",
      "idUser",
      "nameUser",
      "passUser",
      "idUserRole",
      "actIndUser",
      "avatarUrl",
    ];
    const userReq: UserResModel = (<any>req).user;
    const sendData = {
      _nameUser: userReq.nameUser,
      ...req.body,
    };
    const dataToSql = _.pick(sendData, pickerUpdate);

    const procedureName = "users_update";
    const query = DATABASE.getQuery(procedureName, dataToSql);

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          msg: `El usuario se ha modificado.`,
          data: user,
        });
      }
    });
  }

  public deleteUser(req: Request, res: Response) {
    const pickerNew = ["nameUser", "idUser"];
    const userReq: UserResModel = (<any>req).user;
    const sendData = {
      nameUser: userReq.nameUser,
      ...req.body,
    };
    const dataToSql = _.pick(sendData, pickerNew);

    const procedureName = "users_delete";
    const query = DATABASE.getQuery(procedureName, dataToSql);

    DATABASE.excQuery(query, (err: any, user: UserResModel[]) => {
      if (err) {
        console.log(err);

        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          msg: `El usuario se ha eliminado.`,
          data: user,
        });
      }
    });
  }
}

const usersController = new UsersController();
export default usersController;
