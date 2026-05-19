const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  acquisitionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  acquisitionCountry: {
    type: String,
    required: true,
  },
  trainingStatus: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed"],
    default: "Not Started",
    required: true,
  },
  reserved: {
    type: Boolean,
    default: false,
    required: true,
  },
  inService: {
    type: Boolean,
    default: false,
    required: true,
  },
  inServiceCountry: {
    type: String,
  },
  breed: {
    type: String,
    required: true,
  },
});

const Dog = mongoose.model("dogs", dogSchema);
module.exports = Dog;
