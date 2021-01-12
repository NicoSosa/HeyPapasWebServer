import { PricesResModel } from './pricesModels';
export interface ComboByIdReqModel {
    idCombo: number;
}

export interface ComboResModel {
    idCombo: number;
    codCombo: string;
    nameCombo: string;
    descriptCombo: string;
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
    namePackage: string;
    costPackage: number;
    actIndCombo: number;
}

export interface ProductOfComboResModel {
    idCombo: number;
    codCombo: string;
    nameCombo: string;
    idProduct: number;
    codProduct: string;
    nameProduct: string;
    state: number;
    urlImg: string;
    actIndProduct: number;
    quantity: number;
    subtotal: number;
}

export interface ComboFinalResModel extends ComboResModel {
    products: ProductOfComboResModel[];
}

export interface ComboSimpleWithPrice extends PricesResModel {
    idCombo: number;
    codCombo: string;
    nameCombo: string;
    state: number;
    urlImg: string;
    actIndCombo: number;
}