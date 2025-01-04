require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const verifyApiKey = require("./src/middlewares/authMiddleware");
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();

app.use(bodyParser.json());
app.use(verifyApiKey);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
