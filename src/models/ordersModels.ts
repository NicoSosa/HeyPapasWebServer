import { CustomerOrder } from "./customersModels";

export interface OrderByIdReqModel {
  idOrder: number;
}

export interface OrdersResModel {
  idOrder: number;
  idService: number;
  status: number;
  timeLimit: string; //Es date en tabla
  serviceManagementNumber: string;
  createDateOrder: string;
  actIndOrder: boolean;
}

export interface OrderRowModel {
  idOrder: number;
  timeLimit: Date | string;
  customer: CustomerOrder;
  typeService: string;
  managementNumber: string;
  status: number;
}

export interface OrderKitchenResModel extends OrderRowModel {
  products: any[];
}

export interface ProductsForKitchenResModel {
  idProduct: string;
  codProdOrCombo: string;
  unitPrice: number;
  quantity: number;
}
export interface ProductsForKitchenDescriptResModel {
  nameProduct: string;
  description: string;
}

export interface ProductsForKitchenCompleteResModel
  extends ProductsForKitchenResModel, ProductsForKitchenDescriptResModel {
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

export interface OrderUpdateStatusReqModel {
  idOrder: number;
  status: number;
}

export interface NewOrderPayMethodReqModel {
  idPaymentMethod: number;
  amountPayment: number;
  managementPaymentMethodNumber: string;
}

export interface TypeOrderStatusResModel {
  idTypeStatus: number;
  nameTypeStatus: string;
  byDefaultTypeStatus: boolean;
}
