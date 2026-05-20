const Dog = require("../models/dog");

// GET: /dogs - List all dogs
const dogsList = async (req, res) => {
  try {
    const dogs = await Dog.find({}).exec(); // No filters, return all records

    if (!dogs) {
      // DB returns 0 results
      return res.status(404).json({ message: "No dogs found" });
    }
    return res.status(200).json(dogs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// GET: /dogs/:_id - Return data for a specific dog by _id
const dogsFindById = async (req, res) => {
  try {
    const id = req.params.id; // Get the ID from the req
    const dog = await Dog.findById(id).exec(); // Find the dog by ID from the req

    // Check if the dog exists first
    if (!dog) {
      return res.status(404).json({ message: "Dog not found" });
    } else {
      return res.status(200).json(dog);
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST: /dogs - Adds a new dog to the database
const dogsAddDog = async (req, res) => {
  // Destructure the req body
  const {
    name,
    microchipId,
    gender,
    age,
    weight,
    breed,
    acquisitionDate,
    acquisitionCountry,
    trainingStatus,
    reserved,
    inService,
    inServiceCountry,
  } = req.body;

  // Required fields for validations
  const requiredFields = {
    name,
    microchipId,
    gender,
    age,
    weight,
    breed,
    acquisitionCountry,
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
    const microchipExists = await Dog.findOne({
      microchipId: microchipId,
    }).exec();

    if (microchipExists) {
      return res
        .status(400)
        .json({ message: "Dog with this microchip ID already exists" });
    }

    // Create the new dog object
    const newDog = new Dog({
      name,
      microchipId,
      gender,
      age,
      weight,
      breed,
      acquisitionDate,
      acquisitionCountry,
      trainingStatus,
      reserved,
      inService,
      inServiceCountry,
    });

    const savedDog = await newDog.save(); // Save the dog to DB
    return res.status(201).json(savedDog); // Return the data of the new dog
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// PUT /dogs/:_id - Update data for a specific dog
const dogsUpdateDog = async (req, res) => {
  // Destructure the req body
  const {
    name,
    microchipId,
    gender,
    age,
    weight,
    breed,
    acquisitionDate,
    acquisitionCountry,
    trainingStatus,
    reserved,
    inService,
    inServiceCountry,
  } = req.body;

  try {
    const id = req.params.id; // Get the ID from the req
    const updatedDog = await Dog.findByIdAndUpdate(
      id,
      { $set: req.body },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedDog) {
      return res.status(404).json({ message: "Dog not found" });
    }

    return res.status(200).json(updatedDog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { dogsList, dogsFindById, dogsAddDog, dogsUpdateDog };
