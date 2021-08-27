const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
  incident_number: {
    type: String,
    required: true,
  },
  short_description: {
    type: String,
  },
  priority: {
    type: String,
  },
  state: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const Incident = mongoose.model("Incident", incidentSchema);
module.exports = Incident;
