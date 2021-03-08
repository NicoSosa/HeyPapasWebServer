export interface OrderByIdReqModel {
    idOrder: number;
}

export interface OrdersResModel {
    idOrder: number;
    idService: number;
    status: string;
    timeLimit: string;  //Es date en tabla
    serviceManagementNumber: string;
    createDateOrder: string;
    actIndOrder: boolean;
}

export interface NewOrderReqModel {
    idService: number;
    status: number;
    timeLimit: Date;
    serviceManagementNumber: string;
    activIndOrder: boolean;
    // idPaymentMethod: number;
    // amountPayment: number;
    // managementPaymentMethodNumber: string;
}

export interface DeleteOrderReqModel {
    idOrder: number;
}

export interface NewOrderPayMethodReqModel {
    idPaymentMethod: number;
    amountPayment: number;
    managementPaymentMethodNumber: string;
}