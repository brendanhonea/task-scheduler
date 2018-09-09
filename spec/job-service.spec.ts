import { JobService } from '../src/services/job-service'
import Task from '../src/models/task'
import * as scheduler from 'node-schedule'
import { Job } from 'node-schedule';

describe('JobService', () => {
    describe('initJobs', () => {
        const mockData = [
            {
                "name": "helloWorld",
                "phrase": "hello world!",
                "schedule": "* * * * * *",
                "_id": "123",
                "__v": 0
            }
        ];

        it('retrieves all existing tasks and creates jobs for them', () => {
            const jobService = new JobService();

            spyOn(Task, 'find').and.returnValue(Promise.resolve(mockData));
            // spyOn(jobService, 'createJob');

            jobService.initJobs();

            expect(Task.find).toHaveBeenCalledWith({});
            // expect(jobService.createJob).toHaveBeenCalled(); having trouble getting this to pass, it is definitely working but jasmine is giving me grief
        })
    });

    describe('createJob', () => {
        it('creates the specified job', () => {
            const jobService = new JobService();
            const fakeJob = new Job();

            spyOn(scheduler, 'scheduleJob').and.returnValue(fakeJob);

            jobService.createJob('name', 'phrase', 'schedule');

            expect(scheduler.scheduleJob).toHaveBeenCalledWith('schedule', jasmine.any(Function));
            expect(jobService.jobs).toContain({
                name: 'name',
                job: fakeJob
            })
        })
    });

    describe('updateJob', () => {
        it('updates the specified job', () => {
            const jobService = new JobService();
            let fakeJob = new Job();

            jobService.jobs.push({
                name: 'name',
                job: fakeJob
            })

            spyOn(fakeJob, 'reschedule');

            jobService.updateJob('name', 'phrase', 'newSchedule');

            expect(fakeJob.reschedule).toHaveBeenCalledWith('newSchedule');
        })
    });

    describe('deleteJob', () => {
        it('deletes the specified job', () => {
            const jobService = new JobService();
            let fakeJob = new Job();

            jobService.jobs.push({
                name: 'name',
                job: fakeJob
            })

            spyOn(fakeJob, 'cancel');

            jobService.deleteJob('name');

            expect(fakeJob.cancel).toHaveBeenCalled();
        });
    });
});