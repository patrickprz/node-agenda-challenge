module.exports = {
    run: function () {
      console.log("Task 5 Start -> ", Date(Date.now()));

      let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), 35000);
      });

      promise.then(()=> console.log("Task 5 End -> ", Date(Date.now()));

    },
  };