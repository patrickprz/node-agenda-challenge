module.exports = function (dbString, input, callback) {
    var Agenda = require('agenda');
    var task1 = require('../tasks/task1');

    const agenda = new Agenda({db: {address: dbString}})

    agenda.define('task1', async () => {
      await task1.run();
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
        }
      );
      await agenda.schedule('in 0 seconds', 'task1');
  })();
}