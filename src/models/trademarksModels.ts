export interface TrademarkByIdReqModel {
    idTrademark: number;
}

export interface TrademarksResModel {
    idTrademark: number;
    codTrademark: string;
    nameTrademark: string;
    descriptTrademark: string;
    actIndTrademark: boolean;
}