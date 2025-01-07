require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Adicione esta linha
const { initDb } = require("../src/config/database");
const verifyApiKey = require("../src/middlewares/authMiddleware");
const taskRoutes = require("../src/routes/taskRoutes");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-api-key"],
  })
);

initDb().catch(console.error);

app.use(bodyParser.json());
app.use(verifyApiKey);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
