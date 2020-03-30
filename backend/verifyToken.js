var jwt = require('jsonwebtoken');

//Token verification middleware
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "No token Provided"
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({
        auth: false,
        message: "Failed to authenticate token."
      });
    }
    req.id = decoded.id;
    next();
  });
}

module.exports = verifyToken;