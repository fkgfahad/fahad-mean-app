const router = require('express').Router();

const Message = require('../models/message');
const checkAdmin = require('../middlewares/admin');
const Newsletters = require('../classes/newsletter');

router.get('/', checkAdmin, (req, res, next) => {
  Message.find((error, messages) => {
    if (error) {
      res.status(404).json({
        message: 'Messages not found'
      });
    } else {
      res.status(200).json({
        messages
      });
    }
  });
});

router.get('/:messageId', checkAdmin, (req, res, next) => {
  Message.findOne({ _id: req.params.messageId }, (error, message) => {
    if (error) {
      res.status(404).json({
        message: 'Message not found'
      });
    }
    res.status(200).json({
      message
    });
  });
});

router.post('/', (req, res) => {
  if (req.body.letter) {
    Newsletters.save(
      req.body.date,
      req.body.name,
      req.body.email,
      (err, resu) => {}
    );
  }
  const newMessage = new Message({
    date: req.body.date,
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
    seen: false
  });
  newMessage.save((error, message) => {
    if (error) {
      res.status(500).json({
        message: 'Something went wrong'
      });
    } else {
      res.status(200).json({
        message: 'Thank you for being with me',
        color: 'green'
      });
    }
  });
});

module.exports = router;
