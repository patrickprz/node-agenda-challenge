module.exports = {
    run: function () {
      console.log("Task 4 Start -> ", Date(Date.now()));

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 30000);
      });

      promise.then(()=> console.log("Task 4 End -> ", Date(Date.now())));

    },
  };