const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  todoText: {
    type: String
    //required: true
  },
  todoComplete: {
    type: Boolean,
    default: false
  },
  todoDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model("Todo", todoSchema);
