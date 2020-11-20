import { Response, Request } from "express";

import DATABASE from "../database/database";
import AFIP from "../afip/afip";

import { SaleResModel, SaleByIdReqModel, SaleReqModel } from "../models/salesModels";

class SalesController {
  public getAllSales(req: Request, res: Response) {
    const query = ` SELECT * FROM tblventafinalizada`;

    DATABASE.excQuery(query, (err: any, sales: SaleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: sales,
        });
      }
    });
  }
  public getSales(req: Request, res: Response) {
    const { dateStart, dateEnd } : SaleReqModel = req.body;
    const query = ` SELECT * FROM tblventafinalizada WHERE strFecha BETWEEN '${dateStart}' AND '${dateEnd}' `;

    DATABASE.excQuery(query, (err: any, sales: SaleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: sales,
        });
      }
    });
  }
  public getIdLastSale(req: Request, res: Response) {
    const query = ` SELECT refVentaEnCurso FROM tblventaencurso ORDER BY idVenta DESC LIMIT 1`;

    DATABASE.excQuery(query, (err: any, sales: SaleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: sales,
        });
      }
    });
  }

  public prueba(req: Request, res: Response) {
    let msg = req.body;
    console.log(req.body);
    console.log(req.body.objeto);
    
    res.json({
      ok: true,
      data: msg,
    });
  }


  public getSaleById(req: Request, res: Response) {
    const dataReq: SaleByIdReqModel = req.body;
    const query = ` SELECT * FROM role_view WHERE actIndRole = true AND idRole = ${dataReq.idRole}`;

    DATABASE.excQuery(query, (err: any, sales: SaleResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: sales,
        });
      }
    });
  }
}
const salesController = new SalesController();
export default salesController;
