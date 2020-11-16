const User = require('../models/user');

module.exports = class Admin {
  constructor() {}

  static createAdmin(userId, callback) {
    User.findOne({ _id: userId }, (error, user) => {
      if (error || !user) {
        return callback('User not found');
      }
      const updateUser = user;
      updateUser.type = 'admin';
      User.updateOne({ _id: userId }, updateUser, (err, updatedUser) => {
        if (err || updatedUser === null) {
          return callback('Updating user failed');
        } else {
          return callback(null, updatedUser);
        }
      });
      return callback(null, 'A new admin created');
    });
  }

  static deleteAdmin(adminId, callback) {
    User.findOne({ _id: adminId }, (error, admin) => {
      if (error || !admin) {
        return callback('User not found');
      }
      const updateUser = user;
      updateUser.type = 'client';
      User.updateOne({ _id: userId }, updateUser, (err, updatedUser) => {
        if (err || updatedUser === null) {
          return callback('Updating user failed');
        } else {
          return callback(null, updatedUser);
        }
      });
    });
  }
};
