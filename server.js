const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./keys").ATLAS_URI;
const app = express();
const Incident = require("./schema");
port = process.env.PORT || 5000;

require("dotenv").config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected......."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/post", (req, res) => {
  const newIncident = new Incident({
    incident_number: req.body.incident_number,
    short_description: req.body.short_description,
    priority: req.body.priority,
    state: req.body.state,
    createdAt: Date.now(),
  });
  newIncident
    .save()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/get", (req, res) => {
  Incident.find()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.get("/:id", (req, res) => {
  Incident.findOne({ incident_number: req.params.id })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

app.put("/update/:id", (req, res) => {
  Incident.findByIdAndUpdate(
    req.params.id,
    {
      incident_number: req.body.incident_number,
      short_description: req.body.short_description,
      priority: req.body.priority,
      state: req.body.state,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
