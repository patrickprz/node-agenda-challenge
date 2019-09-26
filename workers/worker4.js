module.exports = function (input, callback) {
    var Agenda = require('agenda');
    var task4 = require('../tasks/task4');

    const mongoConnectionString = 'mongodb://localhost:27017/DbTest';

    const agenda = new Agenda({db: {address: mongoConnectionString}});

    agenda.define('task4', async () => {
      await task4.run();
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
  
      await agenda.schedule('in 30 seconds', 'task4');
  })();
}