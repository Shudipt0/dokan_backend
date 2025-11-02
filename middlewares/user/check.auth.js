const jwt = require("jsonwebtoken");

function checkAuthentication(req, res, next) {
  // get token from header
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized!" });
  }


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
