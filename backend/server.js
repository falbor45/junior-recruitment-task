const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const mongoDB = 'mongodb://testuser:test123@ds115353.mlab.com:15353/to-do-junior-recruitment-task';

mongoose.connect(mongoDB, { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error!'));
db.once('open', function () {

});

let todoSchema = new mongoose.Schema({
  content: String,
  finished: Boolean
});

let Todo = mongoose.model('Todo', todoSchema);


app.use('/to-do-list/backend', function (req, res, next) {
  console.log(`Time: ${new Date()}`);
  next();
});

app.route('/to-do-list/backend/task-list')
  .get(function (req, res) {
    Todo.find({}).exec(function (err, taskList) {
      if (err) {
        res.status(500).send(err)
      }
      res.status(200).send(taskList);
    })
  });

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
