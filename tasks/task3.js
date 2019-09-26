module.exports = {
    run: function () {
      console.log("Task 3 Start -> ", Date(Date.now()));

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 40000);
      });

      promise.then(()=> console.log("Task 3 End -> ", Date(Date.now())));

    },
  };