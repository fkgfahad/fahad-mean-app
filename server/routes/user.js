const router = require('express').Router();

const checkAdmin = require('../middlewares/admin');
const User = require('../models/user');
const select = require('../keys/select');
const dflt = require('../keys/default');

router.get('/users', checkAdmin, (req, res, next) => {
  User.find((error, users) => {
    if (error || users === null) {
      res.status(200).json({ users: [] });
    } else {
      users.map((user) => {
        if (!user.image) {
          user.image = dflt.image;
        }
      });
      res.status(200).json({
        users
      });
    }
  }).select(select.user);
});

router.get('/:userId', checkAdmin, (req, res, next) => {
  User.findOne({ _id: req.params.userId }, (error, user) => {
    if (error || user === null) {
      res.status(404).json({
        message: 'No user found'
      });
    } else {
      res.status(200).json({
        user
      });
    }
  }).select(select.user);
});

module.exports = router;
