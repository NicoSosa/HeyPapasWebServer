export interface TypePriceByIdReqModel {
    idTypePrice: number;
}

export interface TypePricesResModel {
    idTypePrice: number;
    nameTypePrice: string;
    actIndTypePrice: boolean;
}

export interface NewTypePriceReqModel {
    nameTypePrice: string;
}

export interface DeleteTypePriceReqModel {
    idTypePrice: number;
}
