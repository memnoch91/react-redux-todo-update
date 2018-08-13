const express = require("express");
const router = express.Router();

const Todo = require("../../models/TodosSchema");

/**
 * @route       /api/todos/get
 * @description get all todos
 * @acces       Public
 */
router.get("/get", (req, res) => {
  Todo.find((err, data) => {
    err ? req.status(500).json(err.message) : res.status(200).json(data);
  });
});

/**
 * @route       /api/todos/get/:id
 * @description get one by id
 * @acces       Public
 */
router.get("/get/:id", (req, res) => {
  const gotID = req.params._id;
  Todo.findOne(gotID)
    .then(todo => {
      // if (todo._id !== gotID) {
      //   return res.status(404);
      // }
      res.json(todo);
    })
    .catch(err => res.status(404).json(err));
});

/**
 * @route       /api/todos/add
 * @description post a new todo
 * @acces       Public
 */

router.post("/add", (req, res) => {
  const newTodo = new Todo({
    todoText: req.body.todoText
  });

  newTodo.save(req.body, (err, data) => {
    err ? req.status(500).json(err.message) : res.status(200).json(data);
  });
});

/**
 * @route       /api/todos/delete/:id
 * @description delete a todo
 * @acces       Public
 */

router.delete("/delete/:id", (req, res) => {
  Todo.findById(req.params.id)
    .then(todo => todo.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false, error: err.message }));
});

/**
 * @route       /api/todos/update/:id
 * @description update a todo
 * @acces       Public
 */
router.post("/update/:id", (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
    Todo.findOne({ _id: req.params.id }, (err, data) => {
      err ? req.status(500).json(err.message) : res.status(200).json(data);
    });
  });
});

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3333");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

module.exports = router;
