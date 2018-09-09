import * as scheduler from 'node-schedule'
import * as _ from 'lodash'
import Task from '../models/task'


interface NamedJob {
    name: string;
    job: Function;
}

class JobService {
    jobs: NamedJob[] = [];

    constructor() {
        this.initJobs();
    }
    
    initJobs() {
        Task.find({}).then(taskList => {
            taskList.forEach(task => {
                //init any tasks from the db
                this.createJob(task.name, task.phrase, task.schedule);
            });
        });
    }

    createJob(name: string, phrase: string, schedule: string) {
        const job = scheduler.scheduleJob(schedule, () => {
            console.log(`server says: ${phrase}`);
        });

        this.jobs.push({ name: name, job: job });
    }

    updateJob(name: string, phrase: string, schedule: string) {
        const namedJob = _.find(this.jobs, (job) => {
            return job.name === name;
        });

        namedJob.job.reschedule(schedule);
    }

    deleteJob(name: string) {
        const namedJob = _.find(this.jobs, (job) => {
            return job.name === name;
        });

        namedJob.job.cancel();
    }
}

const jobService = new JobService();
export default jobService;