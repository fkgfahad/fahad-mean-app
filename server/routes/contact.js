const router = require('express').Router();

const Contact = require('../models/contact');
const checkAdmin = require('../middlewares/admin');

router.get('/', (req, res, next) => {
  Contact.find((error, contacts) => {
    if (error) {
      res.status(500).json({
        message: 'Contacts not found'
      });
    } else {
      res.status(200).json({
        contacts
      });
    }
  });
});

router.post('/', checkAdmin, (req, res, next) => {
  setTimeout(() => {
    res.status(200).json({
      message: 'Thank you for being with me',
      color: 'green'
    });
  }, 2000);
});

module.exports = router;
