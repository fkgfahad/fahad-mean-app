const Newsletter = require('../models/newsletter');
const select = require('../keys/select');

module.exports = class Newsletters {
  static save(date, name, email, callback) {
    const newNewsletter = new Newsletter({
      date,
      name,
      email
    });
    newNewsletter.save((error, letter) => {
      if (error) {
        if (error.errors.email.kind === 'regexp') {
          return callback('Invalid email address');
        } else if (error.errors.email.kind === 'unique') {
          return callback(null, 'You are already subscribed!', 'warn');
        } else {
          return callback('Internal server error');
        }
      } else {
        return callback(null, 'Thanl you for subscription', 'green');
      }
    });
  }

  static getAll(callback) {
    Newsletter.find((error, newsletters) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, newsletters);
      }
    }).select(select.newsletter);
  }
};
