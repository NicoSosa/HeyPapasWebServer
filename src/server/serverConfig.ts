class ServerConfig {    
    constructor() {
        this.start();
    }

    private start(): void {
        process.env.PORT            = (process.env.PORT || 3000).toString();
        process.env.NODE_ENV        = process.env.NODE_ENV || 'dev';
        process.env.CADUCIDAD_TOKEN = (1000*60*60*24*30).toString();
        process.env.SEED            = process.env.SEED || 'texto-de-semilla-para-desarrollo';
        process.env.HASHLAP         = '20';
    }
}

const serverConfig = new ServerConfig;
export default ServerConfig;
