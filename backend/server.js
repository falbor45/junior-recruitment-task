const express = require('express');

const app = express();
const port = 3000;

app.use('/to-do-list/backend', function (req, res, next) {
  console.log(`Time: ${new Date()}`);
  next();
});

app.route('/to-do-list/backend')
  .get(function (req, res) {
    res.send('Server is up and running!')
  });

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
