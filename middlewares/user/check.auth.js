const jwt = require("jsonwebtoken");

function checkAuthentication(req, res, next) {
  // get token from header
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized!" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("Current server time:", Math.floor(Date.now()/1000));
console.log("Token exp:", decoded?.exp);
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
