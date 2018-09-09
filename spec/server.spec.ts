import { Server } from '../src/server'
import * as express from 'express';
import * as mongoose from 'mongoose';
import TaskController from '../src/controllers/task-controller';

describe('config', () => {
    let server: Server;

    beforeEach(() => {
        server = new Server();
    });

    it('initializes the config', () => {
        spyOn(mongoose, 'connect');
        
        server.config();
        
        expect(mongoose.connect).toHaveBeenCalledWith('mongodb://localhost/task-scheduler');
    });
});

describe('routes', () => {
    let server: Server;
    
    beforeEach(() => {
        server = new Server();
    });
    
    it('defines the router and routes', () => {
        spyOn(express, 'Router').and.returnValue('fakeRouter');
        spyOn(server.app, 'use');
        
        server.routes();

        expect(server.app.use).toHaveBeenCalledWith('/', 'fakeRouter');
        expect(server.app.use).toHaveBeenCalledWith('/api/v1/tasks', TaskController);
   });
});