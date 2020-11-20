
import * as _ from 'underscore';
const Afip = require('@afipsdk/afip.js');


export default class AFIP {
    
    private static _instance: AFIP;
    public afip: any;

    constructor() {   
        this.afip = new Afip({ CUIT: 33716791799, production: true, res_folder: "./src/afip/credentials/"});
        getStateAfip(this.afip);
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    static getCUIT() {
        return ({
            cuit: this.instance.afip.CUIT
        });
    };

    static getVoucherByCae(voucherNum: number, pointOfSell: number, voucherType: number): Promise <any> {
        return new Promise (async (resolve, reject)  =>  {
            let voucherInfo = await this.instance.afip.ElectronicBilling.getVoucherInfo(voucherNum,pointOfSell,voucherType); //Devuelve la información del comprobante 1 para el punto de venta 1 y el tipo de comprobante 6 (Factura B)
            if (voucherInfo) {
                resolve(voucherInfo);
            }
        });
    };

    static newAfipVoucher(data: any): Promise <any> {
        return new Promise ((resolve, reject)  =>  {
            getLastVoucher(this.instance.afip, data.PtoVta, data.CbteTipo).then((respuesta: number) =>  {
                if(respuesta) {
                    data.CbteDesde = respuesta+1;
                    data.CbteHasta = respuesta+1;
                    console.log(data);
                    
                    this.instance.afip.ElectronicBilling.createVoucher(data).then((res:any) => {
                        if(res) {
                            resolve({
                                ...res, utlComprobante: respuesta.toString()
                            });
                        } else {
                            reject("No se pudo crear el comprobante     " + respuesta);
                        }
                    });
                    
                } else {
                    if(respuesta==0){
                        data.CbteDesde = 1;
                        data.CbteHasta = 1;
                        console.log(data);
                        
                        this.instance.afip.ElectronicBilling.createVoucher(data).then((res:any) => {
                            if(res) {
                                resolve({
                                    ...res,utlComprobante: respuesta.toString()
                                });
                            }  else {
                                reject("No se pudo crear el comprobante (n° de comprobante 0 if)     " + respuesta);
                            }
                        });
                    }else {
                        reject("No se pudo obtener n° ultimo comprobante  (n° de comprobante 0 else)   " + respuesta);
                    }

                    reject("No se pudo obtener n° ultimo comprobante" + respuesta);
                }
            });
        });
    };

}



async function getLastVoucher(afip: any, pointOfSell: number, voucherType: number): Promise<number>  { 
    const lastVoucherNumber = await afip.ElectronicBilling.getLastVoucher(pointOfSell, voucherType); //Devuelve el número del último comprobante creado para el punto de venta "pointOfSell" y el tipo de comprobante "voucherType" --> 6 (Factura B)
    return(lastVoucherNumber);
}

 async function getStateAfip(afip: any)  { 
    const serverStatus = await afip.ElectronicBilling.getServerStatus();
    console.log(serverStatus);
    
}

 
