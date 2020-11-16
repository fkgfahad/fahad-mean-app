const router = require('express').Router();

const checkAuth = require('../middlewares/auth');
const User = require('../models/user');

const Users = require('../classes/users');
const Auth = require('../classes/auth');
const Mailer = require('../classes/mailer');
const Token = require('../classes/jwt');
const dflt = require('../keys/default');

router.post('/signup', (req, res, next) => {
  Users.createUser(
    req.body.date,
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.cpassword,
    (error, user) => {
      if (error) {
        return res.status(400).json({
          message: error
        });
      }
      Mailer.sendForReg(user.email, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(info);
        }
      });
      Token.forUser(user._id, user.email, user.type, (token) => {
        res.status(201).json({
          user: {
            _id: user._id,
            date: user.date,
            name: user.name,
            email: user.email,
            verified: user.verified,
            disabled: user.disabled,
            image: user.iamge ? user.image : dflt.image,
            type: user.type
          },
          token
        });
      });
    }
  );
});

router.post('/login', (req, res, next) => {
  Auth.login(req.body.email, req.body.password, (error, user, token) => {
    if (user && token) {
      res.status(200).json({
        user: {
          _id: user._id,
          date: user.date,
          name: user.name,
          email: user.email,
          verified: user.verified,
          disabled: user.disabled,
          image: user.iamge ? user.image : dflt.image,
          type: user.type
        },
        token
      });
    } else {
      res.status(406).json({
        message: error
      });
    }
  });
});

router.get('/autosign', checkAuth, (req, res, next) => {
  if (!req.user) {
    return res.status(200);
  }
  User.findOne({ _id: req.user.id }, (err, user) => {
    if (err) {
      return res.status(200);
    }
    Token.forUser(user._id, user.email, user.type, (token) => {
      res.status(200).json({
        user: {
          _id: user._id,
          date: user.date,
          name: user.name,
          email: user.email,
          verified: user.verified,
          disabled: user.disabled,
          image: user.iamge ? user.image : dflt.image,
          type: user.type
        },
        token
      });
    });
  });
});

router.post('/forgot', (req, res, next) => {
  const email = req.body.email;
  Auth.sendUserVerification(email, (error, user) => {});
});

router.post('/email/:version/:verificationId', (req, res, next) => {
  const jvId = req.params.verificationId;
  Auth.jwtEmailConfirmation(jvId, (error, user) => {
    if (error) console.log(error);
    Auth.makeUserVerified(user.id, (error, vUser) => {
      if (error) console.log(error);
      res.status(200).json({
        user: {
          _id: vUser._id,
          date: vUser.date,
          name: vUser.name,
          email: vUser.email,
          verified: vUser.verified,
          disabled: vUser.disabled,
          image: vUser.image,
          type: vUser.type
        }
      });
    });
  });
});

module.exports = router;
