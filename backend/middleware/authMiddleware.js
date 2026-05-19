const jwt = require("jsonwebtoken");

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
  // Get the token from the header
  const authHeader = req.headers["authorization"];
  if (authHeader == null) {
    console.log("Auth Header Required but NOT PRESENT!");
    return res.sendStatus(401);
  }
  // Split the header up to extract the token
  let headers = authHeader.split(" ");
  if (headers.length < 2) {
    console.log("Not enough tokens in Auth Header: " + headers.length);
    return res.sendStatus(501);
  }
  const token = headers[1];
  if (token == null) {
    console.log("Null Bearer Token");
    return res.sendStatus(401);
  }

  // Use JWT to verify the provided token
  jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
    if (err) {
      return res.status(401).json({ message: "Token Validation Error!" });
    }
    req.user = verified; // Set the auth param to the decoded object
    next(); // Continue only after successful verification
  });
}

module.exports = authenticateJWT;
