const express = require("express");
const { createTask, getAllTask, getSingle, updateTask, deleteTask } = require("../controllers/TodoAuth");
const router = express.Router();


router.post("/",createTask)
router.get("/",getAllTask)
router.get("/:id",getSingle)
router.put("/:id",updateTask)
router.delete("/:id",deleteTask)



module.exports = router;