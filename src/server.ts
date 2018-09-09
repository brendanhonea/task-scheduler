import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser'
import TaskController from './controllers/task-controller';

export class Server {
    app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
    }
    
    public config() {
        //setup mongoose
        mongoose.connect('mongodb://localhost/task-scheduler');
        
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}));
    }
    
    public routes(): void {
        let router = express.Router();
        
        this.app.use('/', router);
        this.app.use('/api/v1/tasks', TaskController);
    }  
}

export default new Server().app;