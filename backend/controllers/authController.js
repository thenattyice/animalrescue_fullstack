const User = require("../models/user");
const generateJWT = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Duplicate user check based on email
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create the new user
    const user = new User({
      name, // Set user name
      email: email.toLowerCase(), // Set email address
    });

    user.setPassword(password); // Set user password
    const savedUser = await user.save(); // Save the user to DB
    const token = generateJWT(savedUser); // Generate the token
    return res.status(200).json({ token }); // Return new user token
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Make sure all body fields are populated
    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Check if the user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify the password
    if (userExists.validPassword(password)) {
      const token = generateJWT(userExists);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
