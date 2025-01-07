const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/TaskController");

// Rotas para tarefas
router.post("/", TaskController.createTask.bind(TaskController));
router.get("/", TaskController.getAllTasks.bind(TaskController));
router.put("/:id", TaskController.updateTask.bind(TaskController));
router.delete("/:id", TaskController.deleteTask.bind(TaskController));
router.get("/stats", TaskController.getTaskStats.bind(TaskController));

module.exports = router;
