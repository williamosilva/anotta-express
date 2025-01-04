const taskService = require("../services/taskService");

class TaskController {
  async createTask(req, res) {
    try {
      const { title, description } = req.body;
      const task = await taskService.createTask(title, description);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      if (status && !["PENDING", "IN_PROGRESS", "COMPLETED"].includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
      }

      const result = await taskService.updateTask(
        id,
        title,
        description,
        status
      );
      res.json(result);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const result = await taskService.deleteTask(id);
      res.json(result);
    } catch (error) {
      if (error.message === "Tarefa não encontrada") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  async getTaskStats(req, res) {
    try {
      const stats = await taskService.getTaskStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TaskController();
