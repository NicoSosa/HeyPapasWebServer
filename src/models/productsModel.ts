import { PricesResModel } from './pricesModels';
export interface ProductByIdReqModel {
    idProduct: number;
}

export interface ProductResModel {
    idProduct: number;
    codProduct: string;
    nameProduct: string;
    descriptProduct: string;
    state: number;
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
    actIndProduct: number;
}

export interface ProductFinalResModel extends ProductResModel {
    prices: PricesResModel[];
}

export interface ProductSimpleWithPrice extends PricesResModel {
    idProduct: number;
    codProduct: string;
    nameProduct: string;
    state: number;
    urlImg: string;
    actIndProduct: number;
}

export interface ProductSimple {
    idProduct: number;
    codProduct: string;
    nameProduct: string;
    state: number;
    urlImg: string;
    actIndProduct: number;
}