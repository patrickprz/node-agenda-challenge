var phaseCounter = 0;

var middleware = require('./middleware');

const dbString = 'mongodb://localhost:27017/DbTest';

var Agenda = require('agenda');

const agenda = new Agenda({db: {address: dbString}})

agenda.define('run-jobs', (job, done) => {
    console.log('Middleware run: ', phaseCounter);
    middleware.run();
    done();
  });

(async function () { 
    const runJobs = agenda.create('run-jobs');
 
    await agenda.start();
    
    //limpa o gerenciador dos jobs
    const numRemoved = await agenda.cancel({name: 'run-jobs'});
    console.log("clear master job: ", numRemoved);

    await runJobs.repeatEvery('2 minutes').save();

    agenda.on('start', job => {
        console.log('Job %s starting ' + Date(Date.now), job.attrs.name);
        });

    agenda.on('complete', function(job, done) { 
        phaseCounter++;
        console.log('Job %s finished ' + Date(Date.now), job.attrs.name);
        //   job.remove(function(err) {
        //       console.log(err); 
        //   })
        //callback(null, input + ' PID(' + process.pid + ')');
    }
  );
})();