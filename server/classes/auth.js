const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('nodemailer');

const User = require('../models/user');
const Token = require('./jwt');
const keys = require('../keys/keys');

module.exports = class Auth {
  static login(email, password, callback) {
    User.findOne({ email: email }, (error, user) => {
      if (user !== null && user) {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (!result) {
              return callback('Invalid password');
            }
            Token.forUser(user._id, user.email, user.type, (token) => {
              return callback(null, user, token);
            });
          })
          .catch((err) => {
            console.log(err);
            return callback('Invalid password');
          });
      } else {
        return callback('User not found');
      }
    });
  }

  static generateToken(id, email, callback) {
    jwt.sign(
      { id, email },
      keys.jwt_key,
      { expiresIn: '2d' },
      (error, token) => {
        if (error) {
          return callback('Cannot generate token');
        }
        return callback(null, token);
      }
    );
  }

  static makeUserVerified(userId, callback) {
    User.findOne({ _id: userId }, (error, user) => {
      if (error || !user) {
        return callback('User not found');
      }
      // update user stuff
      user.verified = true;
      User.updateOne({ _id: userId }, user, (error, user) => {
        if (error || !user) {
          return callback('User not found');
        }
        return callback(null, user);
      });
    });
  }

  static jwtEmailConfirmation(token, callback) {
    const decode = jwt.verify(token, keys.jwt_email);
    if (decode) {
      return callback(null, decode);
    }
    return callback('Failed to verify email');
  }

  static sendUserVerification(email, callback) {
    const emailToken = jwt.sign(
      {
        email: email
      },
      keys.jwt_email,
      { expiresIn: '7d' }
    );

    // mailer
    const transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
        user: keys.mailer.user,
        pass: keys.mailer.password
      }
    });
    const mailOptions = {
      from: `"Fahad Hossain | MEAN Developer" <${keys.mailer.user}>`,
      to: email,
      subject: 'Email verification',
      html: `<h1>Hey</h1><a href="${emailToken}">Verify</a>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return callback(error);
      }
      return callback(null, info);
    });
  }
};
