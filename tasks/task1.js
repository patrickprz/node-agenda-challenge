module.exports = {
    run: function () {
      console.log("Task 1 Start -> ", Date(Date.now()));

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 50000);
      });

      promise.then(()=> console.log("Task 1 End -> ", Date(Date.now())));

    },
  };