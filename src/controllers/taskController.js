const TaskService = require("../services/taskService");

class TaskController {
  async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const task = await TaskService.createTask(title, description);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;
      const updatedTask = await TaskService.updateTask(
        id,
        title,
        description,
        status
      );
      res.json(updatedTask);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const result = await TaskService.deleteTask(id);
      res.json(result);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async getTaskStats(req, res) {
    try {
      const stats = await TaskService.getTaskStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new TaskController();
