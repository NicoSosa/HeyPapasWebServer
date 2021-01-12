export interface PricesbyProdId {
    idProduct: number;
}
export interface PricesbyComboId {
    idCombo: number;
}

export interface PriceById {
    idPrice: number;
}

export interface PricesResModel {
    idPrice: number;
    costWithoutIva: number;
    ivaCost: number;
    costWithIva: number;
    profitability: number;
    ppvWOIva: number;
    ivaPpv: number;
    ppvWIva: number;
}

export interface NewPriceReqModel {
    idProd: number;
    codProd: string;
    idPrice: number;
    costWithOutIva: number;
    ivaCost: number;
    costWithIva: number;
    profit: number;
    ppvWOIva: number;
    ivaPpv: number;
    ppvWIva: number;
    state: boolean;
    idTypePrice: number;
}