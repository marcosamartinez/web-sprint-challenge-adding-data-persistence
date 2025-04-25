// build your `/api/projects` router here

const express = require("express");
const router = express.Router();
const projectModel = require("./model");

router.get("/", async (req, res) => {
  const projects = await projectModel.find();

  res.send(projects).json();
});

router.post("/", async (req, res) => {
  try {
    const project = await projectModel.add(req.body);

    if (project && project.status) {
      return res.status(project.status).json({ message: project.message });
    }

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
