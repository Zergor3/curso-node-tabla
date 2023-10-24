import express, {Application} from 'express';
import router from "../routes/usuario";
import cors from "cors";
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private paths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';
        this.dbConenction();
        this.middlewares();
        this.routes();
    }

    async dbConenction() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (e: any) {
            throw new Error(e);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.usuarios, router);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;