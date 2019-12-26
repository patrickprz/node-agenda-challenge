
const run = function(){
  var workerFarm = require('worker-farm');
  var worker1    = workerFarm(require.resolve('./workers/worker1'));
  var worker2    = workerFarm(require.resolve('./workers/worker2'));
  var worker3    = workerFarm(require.resolve('./workers/worker3'));
  var worker4    = workerFarm(require.resolve('./workers/worker4'));
  var worker5    = workerFarm(require.resolve('./workers/worker5'));
  const mongoConnectionString = 'mongodb://localhost:27017/DbTest';

  worker1(mongoConnectionString, '#WORKER1', function (err, output) {
    console.log(output);
    workerFarm.end(worker1);
  })
  
  worker2(mongoConnectionString, '#WORKER2', function (err, output) {
    console.log(output);
    workerFarm.end(worker2);
  })
  
  worker3(mongoConnectionString, '#WORKER3', function (err, output) {
    console.log(output);
    workerFarm.end(worker3);
  })
  
  worker4(mongoConnectionString, '#WORKER4', function (err, output) {
    console.log(output);
    workerFarm.end(worker4);
  })
  
  worker5(mongoConnectionString, '#WORKER5', function (err, output) {
    console.log(output);
    workerFarm.end(worker5);
  })
}

exports.run = run;