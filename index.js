const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(bodyParser.json());

// Criar uma nova tarefa
app.post("/tasks", (req, res) => {
  const { title, description } = req.body;

  db.run(
    "INSERT INTO tasks (title, description) VALUES (?, ?)",
    [title, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        id: this.lastID,
        title,
        description,
        status: "PENDING",
        created_at: new Date().toISOString(),
      });
    }
  );
});

// Listar todas as tarefas
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Atualizar uma tarefa
app.put("/tasks/:id", (req, res) => {
  const { title, description, status } = req.body;

  if (status && !["PENDING", "IN_PROGRESS", "COMPLETED"].includes(status)) {
    return res.status(400).json({ error: "Status inválido" });
  }

  db.run(
    "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?",
    [title, description, status, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Tarefa não encontrada" });
      }
      res.json({ message: "Tarefa atualizada com sucesso" });
    }
  );
});

// Deletar uma tarefa
app.delete("/tasks/:id", (req, res) => {
  db.run("DELETE FROM tasks WHERE id = ?", req.params.id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json({ message: "Tarefa deletada com sucesso" });
  });
});

// Obter estatísticas das tarefas
app.get("/tasks/stats", (req, res) => {
  db.get(
    `SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN status = 'COMPLETED' THEN 1 ELSE 0 END) as completed
    FROM tasks`,
    [],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({
        completed: row.completed,
        total: row.total,
        formatted: `${row.completed}/${row.total}`,
      });
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
