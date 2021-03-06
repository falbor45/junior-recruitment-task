const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/to-do-list/frontend', express.static('frontend'))

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  console.log(`Time: ${new Date()}`);
  next();
});

app.route('/to-do-list/backend/task-list')
  .get(function (req, res) {
    Todo.find({}).exec(function (err, taskList) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(taskList);
    })
  })
  .post(function (req, res) {
    if (typeof req.body.content !== "string") {
      return res.status(400).send("Task content must be of String type!");
    }

    if (req.body.content === "") {
      return res.status(400).send("Task content must not be empty!")
    }

    let freshTodo = new Todo({content: req.body.content, finished: false});

    freshTodo.save(function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(freshTodo);
    });
  })
  .put(function (req, res) {
    if (typeof req.body.content !== "string") {
      return res.status(400).send("Task content must be of String type!");
    }

    if (req.body.content === "") {
      return res.status(400).send("Task content must not be empty!");
    }

    Todo.findByIdAndUpdate(req.query.todoId, req.body, { new: true }, function (err, todo) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(todo);
    })
  })
  .delete(function (req, res) {
    Todo.findByIdAndRemove(req.query.todoId, function (err, todo) {
      if (err) {
        return res.status(500).send(err);
      }
      const message = {
        content: "Todo task successfully deleted!",
        id: todo._id
      };
      return res.status(200).send(message);
    })
  });

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
