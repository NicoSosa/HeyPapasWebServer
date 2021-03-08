import { Response, Request } from "express";
import _ from "underscore";

import DATABASE from "../database/database";

import {
  OrdersResModel,
  NewOrderPayMethodReqModel,
  TypeOrderStatusResModel,
} from "../models/ordersModels";
import { UserResModel } from "../models/usersModels";

class OrdersController {
  public getOrders(req: Request, res: Response) {
    const query = ` SELECT * FROM order_view WHERE actIndOrder = true ORDER BY createDateOrder `;

    DATABASE.excQuery(query, (err: any, orders: OrdersResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: orders,
        });
      }
    });
  }

  public newOrder(req: Request, res: Response) {
    const pickerOrder = [
      "nameUser",
      "idService",
      "status",
      "timeLimit",
      "serviceManagementNumber",
      "activIndOrder",
      "customerName",
      "customerTelephone",
      "customerAddress",
      "customerLocality",
      "customerOtherData",
      "codUser",
      "codCuponDiscount",
      "amountDiscount",
      "idTypeDiscount",
    ];

    const productsToOrderDetails: any[] = req.body.products;

    const pickerProductsDetails = [
      "nameUser",
      "idOrder",
      "codProdOrCombo",
      "unitPrice",
      "quantity",
    ];

    const pickerPayMethod = [
      "idPaymentMethod",
      "idOrder",
      "amountPayment",
      "managementPaymentMethodNumber",
    ];

    const payMethodsToOrder: any[] = req.body.payMethods;

    const userReq: UserResModel = (<any>req).user;

    const sendData = {
      nameUser: userReq.nameUser,
      ...req.body,
    };
    const dataToSql = _.pick(sendData, pickerOrder);

    const procedureName = "orders_new";
    const query = DATABASE.getQuery(procedureName, dataToSql);

    DATABASE.excQuery(query, (err: any, orders: OrdersResModel[][]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        const idOrder = orders[0][0].idOrder;
        const prodLength = productsToOrderDetails.length;
        //Comprobar si la orden se crea sin productos (aqui ya deberia funcionar)

        productsToOrderDetails.forEach((product, index) => {
          const dataToSql2 = _.pick(
            {
              nameUser: userReq.nameUser,
              idOrder,
              codProdOrCombo: product.codProdOrCombo,
              unitPrice: product.ppvWIva,
              quantity: product.quantity,
            },
            pickerProductsDetails
          );
          const procedureName2 = "orders_detail_add";
          const query2 = DATABASE.getQuery(procedureName2, dataToSql2);
          console.log(query2);

          DATABASE.excQuery(query2, (err: any, prodOfOrder: any) => {
            if (err) {
              res.status(400).json({
                ok: false,
                error: err,
              });
            } else {
              if (prodLength === index + 1) {
                const payMethodsLength = payMethodsToOrder.length;

                payMethodsToOrder.forEach(
                  (payMethod: NewOrderPayMethodReqModel, indexPay) => {
                    const dataToSql3 = _.pick(
                      {
                        idPaymentMethod: payMethod.idPaymentMethod,
                        idOrder,
                        amountPayment: payMethod.amountPayment,
                        managementPaymentMethodNumber:
                          payMethod.managementPaymentMethodNumber,
                      },
                      pickerPayMethod
                    );

                    const procedureName3 = "orders_newPaymethod";
                    const query3 = DATABASE.getQuery(
                      procedureName3,
                      dataToSql3
                    );

                    console.log(query3);

                    DATABASE.excQuery(
                      query3,
                      (err: any, payMethodsOfOrder: any) => {
                        if (err) {
                          res.status(400).json({
                            ok: false,
                            error: err,
                          });
                        }
                        if (payMethodsLength === indexPay + 1) {
                          console.log("salog");

                          res
                            .status(200)
                            .json({
                              ok: true,
                              msg: "La orden fue creada correctamente",
                            })
                            .status(200);
                        }
                      }
                    );
                  }
                );
              }
            }
          });
        }); //End ForEach
      }
    });
  }

  public getTypeOrderStatus(req: Request, res: Response) {
    const query = ` SELECT * FROM type_order_status_view `;

    DATABASE.excQuery(query, (err: any, typeOrderStatus: TypeOrderStatusResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        
        res.json({
          ok: true,
          data: typeOrderStatus,
        });
      }
    });
  }
}

const ordersController = new OrdersController();
export default ordersController;
