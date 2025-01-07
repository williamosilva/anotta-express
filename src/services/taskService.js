const { pool } = require("../config/database");

class TaskService {
  async createTask(title, description) {
    const query = `
      INSERT INTO tasks (title, description)
      VALUES ($1, $2)
      RETURNING id, title, description, status, created_at
    `;
    const values = [title, description];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async getAllTasks() {
    const query = "SELECT * FROM tasks ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
  }

  async updateTask(id, title, description, status) {
    const query = `
      UPDATE tasks 
      SET title = $1, description = $2, status = $3 
      WHERE id = $4
      RETURNING *
    `;
    const values = [title, description, status, id];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      throw new Error("Tarefa não encontrada");
    }

    return result.rows[0];
  }

  async deleteTask(id) {
    const query = "DELETE FROM tasks WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      throw new Error("Tarefa não encontrada");
    }

    return { message: "Tarefa deletada com sucesso" };
  }

  async getTaskStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed
      FROM tasks
    `;
    const result = await pool.query(query);
    const { total, completed } = result.rows[0];

    return {
      completed,
      total,
      formatted: `${completed}/${total}`,
    };
  }
}

module.exports = new TaskService();
