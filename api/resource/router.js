// build your `/api/resources` router here

const express = require("express");
const router = express.Router();
const resourceModel = require("./model");

router.get("/", async (req, res) => {
  const resources = await resourceModel.find();

  res.send(resources).json();
});

router.post("/", async (req, res) => {
  try {
    const resource = await resourceModel.add(req.body);

    if (resource && resource.status) {
      return res.status(resource.status).json({ message: resource.message });
    }

    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
