module.exports = function (dbString, input, callback) {
    var Agenda = require('agenda');
    var task3 = require('../tasks/task3');

    const agenda = new Agenda({db: {address: dbString}});

    agenda.define('task3', async () => {
      await task3.run();
    });

    (async function () { 
      await agenda.start();
      
      agenda.on('start', job => {
          console.log('Job %s starting ' + Date(Date.now), job.attrs.name);
        });
  
      agenda.on('complete', function(job) { 
          console.log('Job %s finished ' + Date(Date.now), job.attrs.name);
          // job.remove(function(err) {
          //     console.log(err); 
          // });
          callback(null, input + ' PID(' + process.pid + ')');
      });
      await agenda.schedule('in 25 seconds', 'task3');
  })();
}