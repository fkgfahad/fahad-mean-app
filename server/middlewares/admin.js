const jwt = require('jsonwebtoken');
const keys = require('../keys/keys');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, keys.jwt_key);
    if (decodedToken.type === 'admin') {
      next();
    } else {
      res.status(401).json({
        message: 'Authentication failed'
      });
    }
  } catch (error) {
    res.status(401).json({
      message: 'Authentication failed'
    });
  }
};
