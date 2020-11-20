import { Response, Request } from "express";

import AFIP from "../afip/afip";
import {
  newVoucherModel,
  VoucherByCaeReqModel,
  VoucherByCaeResModel,
  AliqIva,
} from "../models/afipModels";
// import { SaleResModel, SaleByIdReqModel, SaleReqModel } from "../models/salesModels";

class AfipController {
  public getAfipDates(req: Request, res: Response) {
    let msg = AFIP.getCUIT();
    res.json(msg);
  }

  public getAfipVoucherByCae(req: Request, res: Response) {
    const dataReq: VoucherByCaeReqModel = req.body;
    AFIP.getVoucherByCae(
      dataReq.voucherNum,
      dataReq.pointOfSell,
      dataReq.voucherType
    ).then((respuesta: VoucherByCaeResModel) => {
      if (respuesta === null) {
        res.status(400).json({
          ok: false,
          error: "El comprobante no existe",
        });
      } else {
        res.json({
          ok: true,
          data: respuesta,
        });
      }
    });
  }

  public newAfipVoucher(req: Request, res: Response) {

    const dataReq: string =  req.body.data;
    console.log(dataReq);
    let voucherData: newVoucherModel = JSON.parse(dataReq);
    const dataReaddy = {
      data: voucherData
    }



    // this.getIvaFromData(dataReq.Iva);
    AFIP.newAfipVoucher(dataReaddy.data).then((respuesta: any) => {
      if (respuesta === null) {
        res.status(400).json({
          error: "No se pudo crear la factura solicitada",
        });
      } else {
        console.log("Se creo la factura ");
        console.log(respuesta);
        
        res.json({
          data: respuesta,
        });
      }
    });
  }

  public getIvaFromData(iva: number[][]): AliqIva[] {
    let ivaReaddy:AliqIva[] = [];
    iva.forEach((fila: number[]) => {
      const ivaMomentaneo: AliqIva = {
        Id: fila[0],
        BaseImp: fila[1],
        Importe: fila[2],
      };
      ivaReaddy.push(ivaMomentaneo);
    });
    console.log(ivaReaddy);
    return ivaReaddy;
  }
}
const afipController = new AfipController();
export default afipController;
