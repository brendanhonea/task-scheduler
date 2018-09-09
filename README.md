
# Overview:
 This is a small API meant to be a proof of concept for a node task manager. It utilizes cron syntax for scheduling and printing specified phrases to the console.

 # Prerequisites: 

 Node/NPM, MongoDB and Typescript installed globally on server -

 ## Install Node/NPM: 

 `https://nodejs.org/en/`

 ## Install Typescript: 

 `$ npm install -g typescript`

 ## Install MongoDB: 

 Follow the installation guide for your OS found [here](https://docs.mongodb.com/manual/installation/)

 After mongodb is installed run it:

 `$ mongod`

 # Starting the server

 ## Clone repo and install dependencies

`$ git clone https://github.com/brendanhonea/task-scheduler.git`

`$ cd task-scheduler`

`$ npm install`

## Start the server

`$ npm run start`

## Run unit tests

`$ npm run test`

# API Reference

## Scheduling syntax

The API uses cron syntax for scheduling tasks -

```
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
```

Some examples: 

`*/10 * * * * *` <- every ten seconds

`* 15 16 * * *` <- 4:15pm every day


The server runs on port 3001 by default, so if you are just running it locally \<hostname\> will always be `localhost:3001`


## **Create Task**

### POST
 `/api/v1/tasks`

Body format: 

```
{
    "name": string,
    "phrase": string,
    "schedule": string
}
```

EXAMPLE: Create a hello world task that runs every 5 seconds 

```
{
    "name": "helloWorld",
    "phrase": "Hello World!",
    "schedule": "*/5 * * * * *"
}

## **Get All Tasks**

### GET 
`/api/v1/tasks`

## **Get One Task**

### GET
 `/api/v1/tasks/:name`

EXAMPLE: `localhost:3001/api/v1/tasks/helloWorld`

## **Update Task Schedule**

### PUT

`/api/v1/tasks/:name`

```
{
    "schedule: string
}
```

EXAMPLE: Update hello world job to run every minute instead of 5 seconds:

`PUT localhost:3001/api/v1/tasks/helloWorld`

body:
```
{
    "schedule": "* * * * * *"
}
```

## **Delete a task**

### DELETE

`/api/v1/tasks/:name`

EXAMPLE: Delete Hello world job

`DELETE localhost:3001/api/v1/tasks/helloWorld`





