module.exports = function (input, callback) {
    var Agenda = require('agenda');
    var task2 = require('../tasks/task2');

    const mongoConnectionString = 'mongodb://localhost:27017/DbTest';

    const agenda = new Agenda({db: {address: mongoConnectionString}});

    agenda.define('task2', async () => {
      await task2.run();
    });

    (async function () { 
      await agenda.start();
      
      agenda.on('start', job => {
          console.log('Job %s starting ' + Date(Date.now), job.attrs.name);
        });
  
      agenda.on('complete', function(job) { 
          console.log('Job %s finished ' + Date(Date.now), job.attrs.name);
          job.remove(function(err) {
              console.log(err); 
          });
          callback(null, input + ' PID(' + process.pid + ')')
      });
  
      await agenda.schedule('in 10 seconds', 'task2');
  })();
}