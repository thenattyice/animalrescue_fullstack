const mongoose = require("mongoose");

const monkeySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  microchipId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
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
  species: {
    type: String,
    required: true,
  },
  tailLength: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});

const Monkey = mongoose.model("monkeys", monkeySchema);
module.exports = Monkey;
