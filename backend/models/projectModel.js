const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    link: String,
  },
  {
    timestamps: true,
    collection: "projects",
  }
);

module.exports = new mongoose.model("Project", projectSchema);
