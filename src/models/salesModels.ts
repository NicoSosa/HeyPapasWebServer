export interface SaleByIdReqModel {
  idRole: number;
}

export interface SaleReqModel {
    dateStart: string;
    dateEnd: string;
}

export interface SaleResModel {
  idRole: number;
  nameRole: string;
  codRole: string;
  descriptRole: string;
  state: number;
}
