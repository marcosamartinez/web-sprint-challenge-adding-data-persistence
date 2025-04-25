// build your `/api/tasks` router here

const express = require("express");
const router = express.Router();
const taskModel = require("./model");

router.get("/", async (req, res) => {
  const task = await taskModel.find();

  res.send(task).json();
});

router.post("/", async (req, res) => {
  try {
    const task = await taskModel.add(req.body);

    if (task && task.status) {
      res.status(task.status).json({ message: task.message || "Error" });
    } else {
      res.status(201).json(task);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
