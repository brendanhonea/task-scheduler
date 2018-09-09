import taskController, { TaskController } from '../src/controllers/task-controller'
import Task from '../src/models/task'
import { Router, Request, Response, NextFunction } from 'express'
import * as request from 'supertest'
import server from '../src/server'
import * as finishTestCase from 'jasmine-supertest'
import jobService from '../src/services/job-service'

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

//API tests

describe('GET /tasks', () => {
    const mockData = [
        {
            "name": "helloWorld",
            "phrase": "hello world!",
            "schedule": "* * * * * *",
            "_id": "123",
            "__v": 0
        }
    ];

    beforeEach(() => {
        //Mock Database call
        spyOn(Task, 'find').and.returnValue(Promise.resolve(mockData))
    });

    it('should respond with OK code and json', (done) => {
        request(server)
            .get('/api/v1/tasks')
            .set('Accept', 'application/json')
            .expect(200, {
                status: 200,
                data: mockData
            })
            .end(finishTestCase(done));
    });
});

describe('GET /task', () => {
    const mockData =
    {
        "name": "helloWorld",
        "phrase": "hello world!",
        "schedule": "* * * * * *",
        "_id": "123",
        "__v": 0
    }

    beforeEach(() => {
        //Mock Database call
        spyOn(Task, 'findOne').and.returnValue(Promise.resolve(mockData))
    });

    it('should respond with OK code and json', (done) => {
        request(server)
            .get('/api/v1/tasks/task1')
            .set('Accept', 'application/json')
            .expect(200, {
                status: 200,
                data: mockData
            })
            .end(finishTestCase(done));
    });
});

describe('DELETE /task', () => {
    const mockData =
    {
        "name": "helloWorld",
        "phrase": "hello world!",
        "schedule": "* * * * * *",
        "_id": "123",
        "__v": 0
    }

    beforeEach(() => {
        //Mock Database call
        spyOn(Task, 'findOneAndRemove').and.returnValue(Promise.resolve(mockData))
        spyOn(jobService, 'deleteJob');
    });

    it('should respond with OK code and json', (done) => {
        request(server)
            .delete('/api/v1/tasks/task1')
            .set('Accept', 'application/json')
            .expect(200, {
                    status: 200,
                    data: mockData
            })
            .expect(() => {
                expect(jobService.deleteJob).toHaveBeenCalledWith('helloWorld');  
            })
            .end(finishTestCase(done));
    });
});

//TODO: Figure out how to acceptance test the POST/PUT methods with supertest/mongo/jasmine, running into issues with mongo saves breaking tests