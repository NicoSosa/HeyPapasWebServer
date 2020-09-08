export interface ProductByIdReqModel {
    idProduct: number;
}

export interface ProductResModel {
    idProduct: number;
    codProduct: string;
    nameProduct: string;
    descriptProduct: string;
    state: number;
    idImg: number;
    codImg: string;
    urlImg: string;
    idCategory: number;
    codCategory: string;
    nameCategory: string;
    idTrademark: number;
    codTrademark: string;
    nameTrademark: string;
    idPackage: number;
    codPackage: string;
    namePackag: string;
    costPackage: number;
    idPrice: number;
    costWithoutIva: number;
    ivaCost: number;
    costWithIva: number;
    profitability: number;
    ppvWOIva: number;
    ivaPpv: number;
    ppvWIva: number;
    actIndProduct: number;
}