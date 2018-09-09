import { Router, Request, Response, NextFunction } from 'express';
import Task from '../models/task'
import * as util from 'util'
import { Model } from 'mongoose';
import jobService from '../services/job-service'

export class TaskController {
    router: Router;

    constructor() {
        this.router = Router();
        this.defineRoutes();
    }

    getTasks(req: Request, res: Response): void {
        Task.find({})
            .then(data => {
                res.status(200);

                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    getTask(req: Request, res: Response): void {
        const name: string = req.params.name;

        Task.findOne({ name })
            .then(data => {
                if (data) {
                    res.status(200);
                } else {
                    res.status(404);
                }

                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    createTask(req: Request, res: Response): void {
        const name: string = req.body.name;
        const phrase: string = req.body.phrase;
        const schedule: string = req.body.schedule;

        const task = new Task({
            name,
            phrase,
            schedule
        });

        task.save()
            .then(task => {
                jobService.createJob(task.name, task.phrase, task.schedule);

                res.status(201);

                const status = res.statusCode;
                res.json({
                    status,
                    task
                })
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    updateTask(req: Request, res: Response): void {
        const name: string = req.params.name;

        Task.findOne({ name })
            .then(task => {
                console.log(util.inspect(task));

                const phrase: string = req.body.phrase ? req.body.phrase : task.phrase;
                const schedule: string = req.body.schedule ? req.body.schedule : task.schedule;
                task.phrase = phrase;
                task.schedule = schedule;

                task.save()
                .then(task => {
                    jobService.updateJob(task.name, task.phrase, task.schedule);
                    
                    res.status(200);
                    const status = res.statusCode;
                    res.json({
                        status,
                        task
                    })
                })
                .catch(err => {
                    res.status(500);

                    const status = res.statusCode;
                    res.json({
                        status,
                        err
                    })
                });
            })
            .catch(err => {
                res.status(500);

                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    deleteTask(req: Request, res: Response): void {
        const name: string = req.params.name;

        Task.findOneAndRemove({ name })
            .then(data => {
                jobService.deleteJob(data.name);

                res.status(200);
                const status = res.statusCode;
                res.json({
                    status,
                    data
                })
            })
            .catch(err => {
                res.status(500);
                const status = res.statusCode;
                res.json({
                    status,
                    err
                })
            });
    }

    defineRoutes() {
        this.router.get('/', this.getTasks);
        this.router.get('/:name', this.getTask);
        this.router.post('/', this.createTask);
        this.router.put('/:name', this.updateTask);
        this.router.delete('/:name', this.deleteTask);
    }
}

const taskController = new TaskController();

export default taskController.router;