const databaseURL  = 'mongodb://localhost:27017';
const databaseName = 'DbTest';
const collection   = 'agendaJobs';

const checkExistingJob = function(jobName, callback){
    const { MongoClient } = require('mongodb');
    MongoClient.connect(databaseURL, { useUnifiedTopology: true }, (err,database) =>{ 
      const jobsDb = database.db(databaseName)
      jobsDb.collection(collection, function (err, collection) {
        collection.find({$and: [{name: jobName}, {lastFinishedAt: {$exists: false}}]}).toArray(function(err, items) {
                if(err) throw err;    
                callback(items);   
            });
        })
    });
  }

  const clearUnfinishedJobs = function(callback){
    const { MongoClient } = require('mongodb');
    MongoClient.connect(databaseURL, { useUnifiedTopology: true }, (err,database) =>{ 
      const jobsDb = database.db(databaseName)
      jobsDb.collection(collection, function (err, collection) {
        collection.deleteMany({lastFinishedAt: {$exists: false}}, function(err, obj) {
            if (err) throw err;
            callback(obj.result.n + " job(s) purged");
          });;
        })
    });
  }

exports.checkExistingJob = checkExistingJob;
exports.clearUnfinishedJobs = clearUnfinishedJobs;