const db = require("../config/database");

class TaskService {
  async createTask(title, description) {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO tasks (title, description) VALUES (?, ?)",
        [title, description],
        function (err) {
          if (err) return reject(err);
          resolve({
            id: this.lastID,
            title,
            description,
            status: "PENDING",
            created_at: new Date().toISOString(),
          });
        }
      );
    });
  }

  async getAllTasks() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  async updateTask(id, title, description, status) {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
        [title, description, status, id],
        function (err) {
          if (err) return reject(err);
          if (this.changes === 0) {
            return reject(new Error("Tarefa não encontrada"));
          }
          resolve({ message: "Tarefa atualizada com sucesso" });
        }
      );
    });
  }

  async deleteTask(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tasks WHERE id = ?", id, function (err) {
        if (err) return reject(err);
        if (this.changes === 0) {
          return reject(new Error("Tarefa não encontrada"));
        }
        resolve({ message: "Tarefa deletada com sucesso" });
      });
    });
  }

  async getTaskStats() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed
        FROM tasks`,
        [],
        (err, row) => {
          if (err) return reject(err);
          resolve({
            completed: row.completed,
            total: row.total,
            formatted: `${row.completed}/${row.total}`,
          });
        }
      );
    });
  }
}

module.exports = new TaskService();
