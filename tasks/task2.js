module.exports = {
    run: function () {
      console.log("Task 2 Start -> ", Date(Date.now()));

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 20000);
      });

      promise.then(()=> console.log("Task 2 End -> ", Date(Date.now())));

    },
  };