export interface VoucherByCaeReqModel {
    voucherNum: number;
    pointOfSell: number;
    voucherType: number;
  }

  export interface AliqIva {
    Id: number;
    BaseImp: number;
    Importe: number;
  }
  
  export interface Iva {
    AliqIva: AliqIva[];
  }


  export interface VoucherByCaeResModel {
    Concepto: number;
    DocTipo: number;
    DocNro: string;
    CbteDesde: string;
    CbteHasta: string;
    CbteFch: string;
    ImpTotal: string;
    ImpTotConc: string;
    ImpNeto: string;
    ImpOpEx: string;
    ImpTrib: string;
    ImpIVA: string;
    FchServDesde: string;
    FchServHasta: string;
    FchVtoPago: string;
    MonId: string;
    MonCotiz: string;
    Iva: Iva;
    Resultado: string;
    CodAutorizacion: string;
    EmisionTipo: string;
    FchVto: string;
    FchProceso: string;
    PtoVta: number;
    CbteTipo: number
  }




  export interface newVoucherModel {
    CantReg : number;
    PtoVta : number;
    CbteTipo : number;
    Concepto : number;
    DocTipo : number;
    DocNro : number;
    CbteDesde : number;
    CbteHasta : number;
    ImpTotal : number;
    ImpTotConc : number;
    ImpNeto : number;
    ImpOpEx : number;
    ImpIVA : number;
    ImpTrib : number;
    MonCotiz : number;
    CbteFch: string;
    MonId: string;
    Iva : number[][];
  }


//   export interface SaleReqModel {
//       dateStart: string;
//       dateEnd: string;
//   }
  