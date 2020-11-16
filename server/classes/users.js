const bcrypt = require('bcryptjs');

const User = require('../models/user');
const passwordValidator = require('../middlewares/password');

module.exports = class Users {
  static createUser(date, name, email, password, cpassword, callback) {
    if (password !== cpassword) {
      return callback('Password did not match');
    }
    if (!passwordValidator.validate(password)) {
      return callback('Invalid password');
    }
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        console.log(error);
        return callback('Cannot hash password');
      } else {
        const newUser = new User({
          date: date,
          name: name,
          email: email,
          verified: false,
          disabled: false,
          image: null,
          password: hash,
          type: 'client'
        });
        newUser.save((error, user) => {
          if (error || user === null) {
            console.log(error);
            return callback(
              'User validation vailed. Please make sure all credentials are correct'
            );
          } else {
            return callback(null, user);
          }
        });
      }
    });
  }

  static getUser(userId, callback) {
    User.findOne({ _id: userId }, (error, user) => {
      if (error || user === null) {
        console.log(error);
        return callback('User not found');
      }
      return callback(null, user);
    });
  }

  static updateUser(userId, updateInfo, callback) {
    User.findOneAndUpdate({ _id: userId }, updateInfo, (error, updatedUser) => {
      if (error || updatedUser === null) {
        console.log(error);
        return callback('Cannot update user');
      } else {
        return callback(null, updatedUser);
      }
    });
  }

  static deleteUser(userId, callback) {
    User.deleteOne({ _id: userId }, (error) => {
      if (error) {
        console.log(error);
        return callback('Cannot delete user');
      }
      return callback(null, 'User deletion successful');
    });
  }

  static disableUser(userId, callback) {
    User.findOne({ _id: userId }, (error, user) => {
      if (error || !user) {
        console.log(error);
        return callback('User not found');
      }
      const newUpdate = user;
      newUpdate.disabled = true;
      User.updateOne({ _id: userId }, newUpdate, (err, updatedUser) => {
        if (err || updatedUser === null) {
          console.log(err);
          return callback('Updating user failed');
        } else {
          return callback(null, updatedUser);
        }
      });
      return callback(null, user);
    });
  }
};
