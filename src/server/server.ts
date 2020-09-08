import express from 'express';
import cors from 'cors';

import serverConfig from './serverConfig';
import Routes from '../routes/router';


export default class Server {
    public app: express.Application;
    private routes = new Routes(); 

    constructor () {
        console.log('constructor del SERVER');
        this.app = express();
        this.config();
    }
    
    static init() {
        return new Server();
    }

    private config(): void {
        serverConfig;
        this.app.set('port', process.env.PORT);                 // seteamos el puerto, lo obtiene desde el enviroment en el cuál se ejecuta la app; sino le asignamos el valor 3000   
        this.app.use(cors());        				            // Para habilitar las peticiones al servidor de MySql
        this.app.use(express.json());                           // Método para poder aceptar los datos en formato json. Esto nos permite recibir los datos que son enviados a através del cuerpo de la peticion en el "raw".. a su vez, (en el post-man) debemos aclarar en el header KEY: Content-Type, VALUE: application/json
        this.app.use(express.urlencoded( {extended: false} ));  // Configuración para enviar desde formularios HTML
        
        this.routes.setRoutes( this.app );                      // Seteo las rutas de los controladores
    }

    start() {
        this.app.listen( this.app.get('port'), () => {
            const portNum = this.app.get('port');
            console.log(`Escuchando el puerto ${portNum}`);
        });
    }
} 