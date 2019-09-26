var Agenda = require('agenda');
var task1 = require('./tasks/task1');
var task2 = require('./tasks/task2');
var task3 = require('./tasks/task3');
var task4 = require('./tasks/task4');
var task5 = require('./tasks/task5');

const mongoConnectionString = 'mongodb://localhost:27017/DbTest';

const agenda = new Agenda({db: {address: mongoConnectionString}});

agenda.define('task1', async () => {
    task1.run();
});

agenda.define('task2', async () => {
    task2.run();
});

agenda.define('task3', async () => {
    task3.run();
});

agenda.define('task4', async () => {
    task4.run();
});

agenda.define('task5', async () => {
    task5.run();
});

  
(async function defineAgenda() { // IIFE to give access to async/await
    await agenda.start();

    //await agenda.every('*/5 * * * * *', 'task2');

    await agenda.schedule('in 0 seconds', 'task1');

    await agenda.schedule('in 10 seconds', 'task2');

    await agenda.schedule('in 25 seconds', 'task3');

    await agenda.schedule('in 30 seconds', 'task4');

    await agenda.schedule('in 45 seconds', 'task5');
})();