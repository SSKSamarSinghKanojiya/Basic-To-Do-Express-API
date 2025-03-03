
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todoId: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });



module.exports = mongoose.model("Todo", TodoSchema);
