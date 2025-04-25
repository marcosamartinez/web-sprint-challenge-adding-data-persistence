// build your `Project` model here
const db = require("../../data/dbConfig");

const find = async () => {
  const projects = await db("projects");
  projects.map((project) => {
    project.project_completed = !project.project_completed ? false : true;
    return project;
  });

  return projects;
};

const add = async (project) => {
  try {
    // Check if project_name exists
    if (!project.project_name) {
      return { status: 400, message: "project_name is required" };
    }

    const [id] = await db("projects").insert(project);
    const newProject = await db("projects").where({ project_id: id }).first();

    if (newProject) {
      newProject.project_completed = Boolean(newProject.project_completed);
    }

    return newProject;
  } catch (error) {
    return { status: 400, message: error.message };
  }
};

module.exports = {
  find,
  add,
};
