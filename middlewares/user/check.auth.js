const jwt = require("jsonwebtoken");

function checkAuthentication(req, res, next) {
  // get token from header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).send({ message: error?.message });
  }
}

function checkAuthorization(req, res, next) {
  const { role } = req.user;

  if (role === "admin") {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized!" });
  }
}

module.exports = { checkAuthentication, checkAuthorization };
