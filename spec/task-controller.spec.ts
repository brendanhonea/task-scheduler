import taskController, { TaskController } from '../src/controllers/task-controller'
import Task from '../src/models/task'
import { Router, Request, Response, NextFunction } from 'express';
import { request } from 'http';

//Unit testing setup on controller
describe('TaskController', () => {
    it('should define a new router', () => {
        const taskController = new TaskController();
        expect(taskController.router).toBeDefined();
    });

    it('defineRoutes should define the routes', () => {
        const taskController = new TaskController();

        spyOn(taskController.router, 'get');
        spyOn(taskController.router, 'post');
        spyOn(taskController.router, 'put');
        spyOn(taskController.router, 'delete');

        taskController.defineRoutes();

        expect(taskController.router.get).toHaveBeenCalledWith('/', taskController.getTasks);
        expect(taskController.router.get).toHaveBeenCalledWith('/:name', taskController.getTask);
        expect(taskController.router.post).toHaveBeenCalledWith('/', taskController.createTask);
        expect(taskController.router.put).toHaveBeenCalledWith('/:name', taskController.updateTask);
        expect(taskController.router.delete).toHaveBeenCalledWith('/:name', taskController.deleteTask);
    });
});

//TODO: write unit tests for funcationality