import mysql from 'mysql';
import * as _ from 'underscore';
import { query } from 'express';
// import mypromise from 'promise-mysql';

type dataBaseRes = [[],{}];

export default class DATABASE {
    
    private static _instance: DATABASE;

    cnn: mysql.Connection;
    conected: boolean = false;

    constructor() {        
        this.cnn = mysql.createConnection({  
            host: 	  'localhost',
            user: 	  'root',
            database: 'heypapasdb',
            port:     3306
        });

        this.connectDB();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    static getQuery( procedureName: string, dataSend: Object ): string {
        let stringOfData = '';
        const array = _.map(dataSend, (value, key) => {
            return `'${value}'`;
        })

        const query: string = `call ${procedureName}(${array})`;
        return query;
    }

    static excQuery( query: string, callback: Function ) {
        this.instance.cnn.query( query, (err, results: dataBaseRes, fields) => {
            if ( err ) {
                callback (err);
            }
            

            if ( results[0] === undefined || results[0].length === 0 ) {
                callback('El registro solicitado no existe')
            } else {
                callback(null, results);
            }
            
        }) 
    }
    

    private connectDB() {
        this.cnn.connect( (err: mysql.MysqlError) => {
            if ( err ) {
                console.log(err.message);
                return;
            }

            this.conected = true;
            console.log('base de datos online');
        });
    }
}
