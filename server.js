const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { id: 'desc' } });
  res.json(tasks);
});

// Add a task
app.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: { title, description },
  });
  res.json(task);
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, isCompleted } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { title, description, isCompleted },
  });
  res.json(task);
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id) } });
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));