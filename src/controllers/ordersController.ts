import { Response, Request } from "express";
import _ from "underscore";

import DATABASE from "../database/database";

import {
  OrderRowModel,
  OrdersResModel,
  OrderKitchenResModel,
  NewOrderPayMethodReqModel,
  TypeOrderStatusResModel,
  OrderUpdateStatusReqModel,
  ProductsForKitchenResModel,
  ProductsForKitchenDescriptResModel,
  OrderByIdReqModel,
  OrderCashCheckResModel,
  OrderPayMethodResModel,
} from "../models/ordersModels";
import { SpecialDiscountReqModel } from "../models/specialDiscountModels";
import { UserResModel } from "../models/usersModels";

class OrdersController {
  public getOrders(req: Request, res: Response) {
    let orderList: OrderRowModel[] = [];
    const query = ` SELECT * FROM order_view WHERE actIndOrder = true ORDER BY createDateOrder `;

    DATABASE.excQuery(query, (err: any, orders: OrdersResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        orders.forEach((order, index) => {
          const idOrder = order.idOrder;
          const idService = order.idService;

          const query2 = ` SELECT * FROM type_service_view WHERE idTypeService = ${idService} AND actIndTypeService = true`;
          DATABASE.excQuery(query2, (err: any, service: any[]) => {
            if (err) {
              res.status(400).json({
                ok: false,
                error: err,
              });
            } else {
              const nameService = service[0].nameTypeService;

              const query3 = ` SELECT * FROM customer_view WHERE idOrder = ${idOrder} `;
              DATABASE.excQuery(query3, (err: any, customer: any[]) => {
                if (err) {
                  res.status(400).json({
                    ok: false,
                    error: err,
                  });
                } else {
                  const nameCustomer = customer[0].nameCustomer;
                  const orderRow: OrderRowModel = {
                    idOrder: idOrder,
                    timeLimit: order.timeLimit,
                    customer: nameCustomer || "Anonimo",
                    typeService: nameService,
                    managementNumber: order.serviceManagementNumber,
                    status: order.status,
                  };
                  orderList.push(orderRow);

                  if (orders.length === index + 1) {
                    res.json({
                      ok: false,
                      data: orderList,
                    });
                  }
                }
              });
            }
          });
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
                        } else {
                          console.log(payMethodsOfOrder[0][0]);

                          if (payMethodsLength === indexPay + 1) {
                            res
                              .status(200)
                              .json({
                                ok: true,
                                data: idOrder,
                                msg: "La orden fue creada correctamente",
                              })
                              .status(200);
                          }
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

  public changeOrderStatusById(req: Request, res: Response) {
    const pickerOrder = ["nameUser", "idOrder", "status"];

    const userReq: UserResModel = (<any>req).user;

    const sendData = {
      nameUser: userReq.nameUser,
      ...req.body,
    };
    const dataToSql = _.pick(sendData, pickerOrder);
    const procedureName = "order_change_status";
    const query = DATABASE.getQuery(procedureName, dataToSql);

    DATABASE.excQuery(query, (err: any, order: OrderUpdateStatusReqModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        res.json({
          ok: true,
          data: order,
        });
      }
    });
  }

  public getTypeOrderStatus(req: Request, res: Response) {
    const query = ` SELECT * FROM type_order_status_view `;

    DATABASE.excQuery(
      query,
      (err: any, typeOrderStatus: TypeOrderStatusResModel[]) => {
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
      }
    );
  }

  public getOrdersForKitchen(req: Request, res: Response) {
    let orderList: OrderRowModel[] = [];
    const query = ` SELECT * FROM order_view WHERE actIndOrder = true ORDER BY createDateOrder `;

    DATABASE.excQuery(query, (err: any, orders: OrdersResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        orders.forEach((order, index) => {
          const idOrder = order.idOrder;
          const idService = order.idService;

          const query2 = ` SELECT * FROM type_service_view WHERE idTypeService = ${idService} AND actIndTypeService = true`;
          DATABASE.excQuery(query2, (err: any, service: any[]) => {
            if (err) {
              res.status(400).json({
                ok: false,
                error: err,
              });
            } else {
              const nameService = service[0].nameTypeService;

              const query3 = ` SELECT * FROM customer_view WHERE idOrder = ${idOrder} `;
              DATABASE.excQuery(query3, (err: any, customer: any[]) => {
                if (err) {
                  res.status(400).json({
                    ok: false,
                    error: err,
                  });
                } else {
                  const query4 = ` SELECT idOrder, codProdOrCombo, unitPrice, quantity FROM order_detail_view WHERE idOrder = ${idOrder} AND actIndOrderDetail = true`;
                  DATABASE.excQuery(
                    query4,
                    (err: any, products: ProductsForKitchenResModel[]) => {
                      if (err) {
                        res.status(400).json({
                          ok: false,
                          error: err,
                        });
                      } else {
                        const productList: ProductsForKitchenResModel[] = products;

                        let productListToReturn: ProductsForKitchenDescriptResModel[] = [];

                        productList.forEach((product, indexProd) => {
                          if (product.codProdOrCombo.startsWith("PRD")) {
                            //Es producto singular
                            const query4 = ` SELECT nameProduct, description FROM product_view WHERE codProduct = '${product.codProdOrCombo}' AND actIndProduct = true`;

                            DATABASE.excQuery(
                              query4,
                              (
                                err: any,
                                productDes: ProductsForKitchenDescriptResModel[]
                              ) => {
                                if (err) {
                                  res.status(400).json({
                                    ok: false,
                                    error: err,
                                  });
                                } else {
                                  const prod = {
                                    ...product,
                                    ...productDes[0],
                                  };
                                  productListToReturn.push(prod);

                                  if (productList.length === indexProd + 1) {
                                    const nameCustomer =
                                      customer[0].nameCustomer;
                                    const orderRow: OrderKitchenResModel = {
                                      idOrder: idOrder,
                                      timeLimit: order.timeLimit,
                                      customer: nameCustomer || "Anonimo",
                                      typeService: nameService,
                                      managementNumber:
                                        order.serviceManagementNumber,
                                      status: order.status,
                                      products: productListToReturn,
                                    };
                                    orderList.push(orderRow);

                                    if (orders.length === index + 1) {
                                      res.json({
                                        ok: true,
                                        data: orderList,
                                      });
                                    }
                                  }
                                }
                              }
                            );
                          }

                          if (product.codProdOrCombo.startsWith("CMB")) {
                            //Es combo
                            const query4 = ` SELECT nameCombo, description FROM combo_view WHERE codCombo = '${product.codProdOrCombo}' AND actIndCombo = true`;

                            DATABASE.excQuery(
                              query4,
                              (
                                err: any,
                                productDes: ProductsForKitchenDescriptResModel[]
                              ) => {
                                if (err) {
                                  res.status(400).json({
                                    ok: false,
                                    error: err,
                                  });
                                } else {
                                  const prod = {
                                    ...product,
                                    ...productDes[0],
                                  };
                                  productListToReturn.push(prod);

                                  if (productList.length === indexProd + 1) {
                                    const nameCustomer =
                                      customer[0].nameCustomer;
                                    const orderRow: OrderKitchenResModel = {
                                      idOrder: idOrder,
                                      timeLimit: order.timeLimit,
                                      customer: nameCustomer || "Anonimo",
                                      typeService: nameService,
                                      managementNumber:
                                        order.serviceManagementNumber,
                                      status: order.status,
                                      products: productListToReturn,
                                    };
                                    orderList.push(orderRow);

                                    if (orders.length === index + 1) {
                                      res.json({
                                        ok: true,
                                        data: orderList,
                                      });
                                    }
                                  }
                                }
                              }
                            );
                          }
                        });
                      }
                    }
                  );
                }
              });
            }
          });
        });
      }
    });
  }

  public getOrdersForKitchenById(req: Request, res: Response) {
    let orderList: OrderRowModel[] = [];

    const dataReq: OrderByIdReqModel = req.body;
    const idOrder: number = dataReq.idOrder;

    const query = ` SELECT * FROM order_view WHERE idOrder = ${idOrder} AND actIndOrder = true `;

    console.log(query);

    DATABASE.excQuery(query, (err: any, order: OrdersResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        console.log(order);

        const idService = order[0].idService;

        const query2 = ` SELECT * FROM type_service_view WHERE idTypeService = ${idService} AND actIndTypeService = true`;
        console.log(query2);

        DATABASE.excQuery(query2, (err: any, service: any[]) => {
          if (err) {
            res.status(400).json({
              ok: false,
              error: err,
            });
          } else {
            const nameService = service[0].nameTypeService;

            const query3 = ` SELECT * FROM customer_view WHERE idOrder = ${idOrder} `;
            DATABASE.excQuery(query3, (err: any, customer: any[]) => {
              if (err) {
                res.status(400).json({
                  ok: false,
                  error: err,
                });
              } else {
                const query4 = ` SELECT idOrder, codProdOrCombo, unitPrice, quantity FROM order_detail_view WHERE idOrder = ${idOrder} AND actIndOrderDetail = true`;
                DATABASE.excQuery(
                  query4,
                  (err: any, products: ProductsForKitchenResModel[]) => {
                    if (err) {
                      res.status(400).json({
                        ok: false,
                        error: err,
                      });
                    } else {
                      const productList: ProductsForKitchenResModel[] = products;

                      let productListToReturn: ProductsForKitchenDescriptResModel[] = [];

                      productList.forEach((product, indexProd) => {
                        if (product.codProdOrCombo.startsWith("PRD")) {
                          //Es producto singular
                          const query4 = ` SELECT nameProduct, description FROM product_view WHERE codProduct = '${product.codProdOrCombo}' AND actIndProduct = true`;

                          DATABASE.excQuery(
                            query4,
                            (
                              err: any,
                              productDes: ProductsForKitchenDescriptResModel[]
                            ) => {
                              if (err) {
                                res.status(400).json({
                                  ok: false,
                                  error: err,
                                });
                              } else {
                                const prod = {
                                  ...product,
                                  ...productDes[0],
                                };
                                productListToReturn.push(prod);

                                if (productList.length === indexProd + 1) {
                                  const nameCustomer = customer[0].nameCustomer;
                                  const orderRow: OrderKitchenResModel = {
                                    idOrder: idOrder,
                                    timeLimit: order[0].timeLimit,
                                    customer: nameCustomer || "Anonimo",
                                    typeService: nameService,
                                    managementNumber:
                                      order[0].serviceManagementNumber,
                                    status: order[0].status,
                                    products: productListToReturn,
                                  };
                                  orderList.push(orderRow);

                                  res.json({
                                    ok: true,
                                    data: orderList,
                                  });
                                }
                              }
                            }
                          );
                        }

                        if (product.codProdOrCombo.startsWith("CMB")) {
                          //Es combo
                          const query4 = ` SELECT nameCombo, description FROM combo_view WHERE codCombo = '${product.codProdOrCombo}' AND actIndCombo = true`;

                          DATABASE.excQuery(
                            query4,
                            (
                              err: any,
                              productDes: ProductsForKitchenDescriptResModel[]
                            ) => {
                              if (err) {
                                res.status(400).json({
                                  ok: false,
                                  error: err,
                                });
                              } else {
                                const prod = {
                                  ...product,
                                  ...productDes[0],
                                };
                                productListToReturn.push(prod);

                                if (productList.length === indexProd + 1) {
                                  const nameCustomer = customer[0].nameCustomer;
                                  const orderRow: OrderKitchenResModel = {
                                    idOrder: idOrder,
                                    timeLimit: order[0].timeLimit,
                                    customer: nameCustomer || "Anonimo",
                                    typeService: nameService,
                                    managementNumber:
                                      order[0].serviceManagementNumber,
                                    status: order[0].status,
                                    products: productListToReturn,
                                  };
                                  orderList.push(orderRow);

                                  res.json({
                                    ok: true,
                                    data: orderList,
                                  });
                                }
                              }
                            }
                          );
                        }
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });
  }

  public getOrdersForCashCheck(req: Request, res: Response) {
    let orderList: OrderCashCheckResModel[] = [];
    const query = ` SELECT * FROM order_view WHERE actIndOrder = true ORDER BY createDateOrder `;

    DATABASE.excQuery(query, (err: any, orders: OrdersResModel[]) => {
      if (err) {
        res.status(400).json({
          ok: false,
          error: err,
        });
      } else {
        orders.forEach((order, index) => {
          const idOrder = order.idOrder;
          const idService = order.idService;

          const query2 = ` SELECT * FROM type_service_view WHERE idTypeService = ${idService} AND actIndTypeService = true`;
          DATABASE.excQuery(query2, (err: any, service: any[]) => {
            if (err) {
              res.status(400).json({
                ok: false,
                error: err,
              });
            } else {
              const nameService = service[0].nameTypeService;

              const query3 = ` SELECT codUser, codCuponDiscount, amountDiscount, idTypeDiscount FROM special_discount_view WHERE idOrder = ${idOrder} `;
              DATABASE.excQuery(
                query3,
                (err: any, specialDiscount: SpecialDiscountReqModel[]) => {
                  if (err) {
                    res.status(400).json({
                      ok: false,
                      error: err,
                    });
                  } else {
                    console.log(specialDiscount);
                    
                    const query3 = ` SELECT * FROM customer_view WHERE idOrder = ${idOrder} `;
                    DATABASE.excQuery(query3, (err: any, customer: any[]) => {
                      if (err) {
                        res.status(400).json({
                          ok: false,
                          error: err,
                        });
                      } else {
                        const query4 = ` SELECT * FROM payment_of_order_view WHERE idOrder = ${idOrder} `;
                        DATABASE.excQuery(
                          query4,
                          (
                            err: any,
                            paymentMethods: OrderPayMethodResModel[]
                          ) => {
                            if (err) {
                              res.status(400).json({
                                ok: false,
                                error: err,
                              });
                            } else {
                              const paymentMethodsLength =
                                paymentMethods.length;
                              const payMethodsList: OrderPayMethodResModel[] = paymentMethods;

                              let payMethodsListToReturn: OrderPayMethodResModel[] = [];
                              
                              payMethodsList.forEach((paymethod) => {
                                payMethodsListToReturn.push({ ...paymethod });
                              });

                              const query5 = ` SELECT idOrder, codProdOrCombo, unitPrice, quantity FROM order_detail_view WHERE idOrder = ${idOrder} AND actIndOrderDetail = true`;
                              DATABASE.excQuery(
                                query5,
                                (
                                  err: any,
                                  products: ProductsForKitchenResModel[]
                                ) => {
                                  if (err) {
                                    res.status(400).json({
                                      ok: false,
                                      error: err,
                                    });
                                  } else {
                                    const productList: ProductsForKitchenResModel[] = products;
                                    let productListToReturn: ProductsForKitchenDescriptResModel[] = [];

                                    productList.forEach(
                                      (product, indexProd) => {
                                        if (
                                          product.codProdOrCombo.startsWith(
                                            "PRD"
                                          )
                                        ) {
                                          //Es producto singular
                                          const query4 = ` SELECT nameProduct, description FROM product_view WHERE codProduct = '${product.codProdOrCombo}' AND actIndProduct = true`;

                                          DATABASE.excQuery(
                                            query4,
                                            (
                                              err: any,
                                              productDes: ProductsForKitchenDescriptResModel[]
                                            ) => {
                                              if (err) {
                                                res.status(400).json({
                                                  ok: false,
                                                  error: err,
                                                });
                                              } else {
                                                const prod = {
                                                  ...product,
                                                  ...productDes[0],
                                                };
                                                productListToReturn.push(prod);

                                                if (
                                                  productList.length ===
                                                  indexProd + 1
                                                ) {
                                                  const nameCustomer =
                                                    customer[0].nameCustomer;

                                                  const orderRow: OrderCashCheckResModel = {
                                                    idOrder: idOrder,
                                                    timeLimit: order.timeLimit,
                                                    customer:
                                                      nameCustomer || "Anonimo",
                                                    typeService: nameService,
                                                    managementNumber:
                                                      order.serviceManagementNumber,
                                                    status: order.status,
                                                    products: productListToReturn,
                                                    paymethods: payMethodsListToReturn,
                                                    specialDiscount: specialDiscount,
                                                  };
                                                  orderList.push(orderRow);

                                                  if (
                                                    orders.length ===
                                                    index + 1
                                                  ) {
                                                    res.json({
                                                      ok: true,
                                                      data: orderList,
                                                    });
                                                  }
                                                }
                                              }
                                            }
                                          );
                                        }

                                        if (
                                          product.codProdOrCombo.startsWith(
                                            "CMB"
                                          )
                                        ) {
                                          //Es combo
                                          const query4 = ` SELECT nameCombo, description FROM combo_view WHERE codCombo = '${product.codProdOrCombo}' AND actIndCombo = true`;

                                          DATABASE.excQuery(
                                            query4,
                                            (
                                              err: any,
                                              productDes: ProductsForKitchenDescriptResModel[]
                                            ) => {
                                              if (err) {
                                                res.status(400).json({
                                                  ok: false,
                                                  error: err,
                                                });
                                              } else {
                                                const prod = {
                                                  ...product,
                                                  ...productDes[0],
                                                };
                                                productListToReturn.push(prod);

                                                if (
                                                  productList.length ===
                                                  indexProd + 1
                                                ) {
                                                  const nameCustomer =
                                                    customer[0].nameCustomer;
                                                  const orderRow: OrderCashCheckResModel = {
                                                    idOrder: idOrder,
                                                    timeLimit: order.timeLimit,
                                                    customer:
                                                      nameCustomer || "Anonimo",
                                                    typeService: nameService,
                                                    managementNumber:
                                                      order.serviceManagementNumber,
                                                    status: order.status,
                                                    products: productListToReturn,
                                                    paymethods: payMethodsListToReturn,
                                                    specialDiscount: specialDiscount,
                                                  };
                                                  orderList.push(orderRow);

                                                  if (
                                                    orders.length ===
                                                    index + 1
                                                  ) {
                                                    res.json({
                                                      ok: true,
                                                      data: orderList,
                                                    });
                                                  }
                                                }
                                              }
                                            }
                                          );
                                        }
                                      }
                                    );
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    });
                  }
                }
              );
            }
          });
        });
      }
    });
  }
}

const ordersController = new OrdersController();
export default ordersController;
