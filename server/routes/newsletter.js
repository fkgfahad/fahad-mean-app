const router = require('express').Router();

const Newsletters = require('../classes/newsletter');
const checkAdmin = require('../middlewares/admin');

router.get('/', checkAdmin, (req, res, next) => {
  Newsletters.getAll((error, newsletters) => {
    if (error) {
      res.status(500).json({
        message: 'Internal server error'
      });
    } else {
      res.status(200).json({
        newsletters
      });
    }
  });
});

router.post('/', (req, res, next) => {
  Newsletters.save(
    req.body.date,
    req.body.name,
    req.body.email,
    (error, message, color) => {
      if (error) {
        res.status(400).json({
          message: error
        });
      } else {
        res.status(200).json({
          message,
          color
        });
      }
    }
  );
});

module.exports = router;
