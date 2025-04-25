// build your `Resource` model here
const db = require("../../data/dbConfig");

const find = async () => {
  const resources = await db("resources");

  return resources;
};

const add = async (resource) => {
  try {
    // Check if resource_name exists
    if (!resource.resource_name) {
      return { status: 400, message: "resource_name is required" };
    }

    const [id] = await db("resources").insert(resource);
    const newResource = await db("resources")
      .where({ resource_id: id })
      .first();

    return newResource;
  } catch (error) {
    // Handle unique constraint error
    if (error.message.includes("UNIQUE constraint failed")) {
      return { status: 400, message: "resource_name must be unique" };
    }
    return { status: 500, message: error.message };
  }
};

module.exports = {
  find,
  add,
};
