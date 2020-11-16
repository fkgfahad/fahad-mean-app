const jwt = require('jsonwebtoken');

const keys = require('../keys/keys');

module.exports = class Token {
  static forMailVerification(email, callback) {
    return callback(jwt.sign({ email }, keys.jwt_email, { expiresIn: '7d' }));
  }

  static forUser(id, email, type, callback) {
    return callback(
      jwt.sign(
        {
          id,
          email,
          type
        },
        keys.jwt_key,
        { expiresIn: '7d' }
      )
    );
  }
};
