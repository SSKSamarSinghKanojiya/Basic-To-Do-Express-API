const Todo = require("../models/Todo.js");

// Create a new Todo
exports.createTask = async (req, res) => {
  // try {
  //   const newTodo = new Todo(req.body);
  //   const savedTodo = await newTodo.save();
  //   res.status(201).json(savedTodo);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    // Find the last inserted todo and get its todoId
    const lastTodo = await Todo.findOne().sort({ todoId: -1 });
    const newTodoId = lastTodo ? lastTodo.todoId + 1 : 1; // Increment or start from 1

    const newTodo = new Todo({ todoId: newTodoId, title });
    await newTodo.save();

    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Todos
exports.getAllTask = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single todo by id
exports.getSingle = async (req,res)=>{
  try {
    const todos = await Todo.findById(req.params.id)
    if (!todos) {
      return res.status(404).json({message:"Todo not found"})
    }
    res.json(todos)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// updated A Todo

exports.updateTask = async(req,res)=>{
  try {
    const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updateTodo) {
      return res.status(404).json({message:"Todo not found"})
    }
    res.json(updateTodo)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}

// Delete a Todo

exports.deleteTask = async(req,res)=>{
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
    if (!deleteTodo) {
      return res.status(404).json({message:"Todo not found"})
    }
    res.json({message:"Todo Deleted successfully"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}