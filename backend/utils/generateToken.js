const jwt = require("jsonwebtoken");

// Method to generate a JSON Web Token for the current record
const generateJWT = function (user) {
  return jwt.sign(
    {
      // Payload for JSON Web Token
      _id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET, // SECRET stored in .env file
    { expiresIn: "1h" },
  ); // Token expires an hour from creation
};

module.exports = generateJWT;
