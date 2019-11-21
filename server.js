const app = require("./src/app");

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log(
    "Your app is listening on : http://localhost:" + listener.address().port
  );
});
