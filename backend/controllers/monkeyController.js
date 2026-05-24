const Monkey = require("../models/monkey");

// GET: /monkeys - List all monkeys
const monkeysList = async (req, res) => {
  try {
    const monkeys = await Monkey.find({}).exec(); // No filters, return all records

    if (!monkeys) {
      // DB returns 0 results
      return res.status(404).json({ message: "No monkeys found" });
    }
    return res.status(200).json(monkeys);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: /monkeys/:_id - Return data for a specific monkey by _id
const monkeysFindById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the req
    const monkey = await Monkey.findById(id).exec(); // Find the monkey by ID from the req

    // Check if the monkey exists first
    if (!monkey) {
      return res.status(404).json({ message: "monkey not found" });
    } else {
      return res.status(200).json(monkey);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST: /monkeys - Adds a new monkey to the database
const monkeysAddMonkey = async (req, res) => {
  // Destructure the req body
  const {
    name,
    microchipId,
    gender,
    age,
    weight,
    species,
    acquisitionDate,
    acquisitionCountry,
    trainingStatus,
    reserved,
    inService,
    inServiceCountry,
    tailLength,
    height,
  } = req.body;

  // Required fields for validations
  const requiredFields = {
    name,
    microchipId,
    gender,
    age,
    weight,
    species,
    acquisitionCountry,
    tailLength,
    height,
  };

  try {
    // Validations

    const missingFields = Object.keys(requiredFields).filter(
      (field) => !requiredFields[field],
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Age and weight >= 0
    if (age < 0 || weight < 0) {
      return res
        .status(400)
        .json({ message: "Age and Weight must be positive values" });
    }

    // Duplicate check
    const microchipExists = await Monkey.findOne({
      microchipId: microchipId,
    }).exec();

    if (microchipExists) {
      return res
        .status(400)
        .json({ message: "Monkey with this microchip ID already exists" });
    }

    // Create the new monkey object
    const newMonkey = new Monkey({
      name,
      microchipId,
      gender,
      age,
      weight,
      species,
      acquisitionDate,
      acquisitionCountry,
      trainingStatus,
      reserved,
      inService,
      inServiceCountry,
      tailLength,
      height,
    });

    const savedMonkey = await newMonkey.save(); // Save the monkey to DB
    return res.status(201).json(savedMonkey); // Return the data of the new monkey
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /monkeys/:_id - Update data for a specific monkey
const monkeysUpdateMonkey = async (req, res) => {
  // Destructure the req body
  const {
    name,
    microchipId,
    gender,
    age,
    weight,
    species,
    acquisitionDate,
    acquisitionCountry,
    trainingStatus,
    reserved,
    inService,
    inServiceCountry,
    tailLength,
    height,
  } = req.body;

  try {
    const id = req.params.id; // Get the ID from the req
    const updatedMonkey = await Monkey.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedMonkey) {
      return res.status(404).json({ message: "monkey not found" });
    }

    return res.status(200).json(updatedMonkey);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  monkeysList,
  monkeysFindById,
  monkeysAddMonkey,
  monkeysUpdateMonkey,
};
