const router = require('express').Router();
const multiparty = require('connect-multiparty')();

const Gallary = require('../classes/image');
const Portfolio = require('../models/portfolio');
const adminCheck = require('../middlewares/admin');

router.get('/', (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = Math.max(0, req.query.page);
  const options = {
    select: '_id date title subtitle skills detail link sourceCode images',
    sort: { date: -1 },
    offset: page ? pageSize * page : 0,
    limit: pageSize ? pageSize : 10
  };
  Portfolio.paginate(options, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong'
      });
    } else {
      res.status(200).json({
        portfolios: data.docs,
        total: data.total
      });
    }
  });
});

router.get('/:portfolioId', (req, res, next) => {
  const portfolioId = +req.params.portfolioId;
  Portfolio.findOne({ _id: portfolioId }, (error, portfolio) => {
    res.status(200).json({
      portfolio
    });
  });
});

router.get('/admin', adminCheck, (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const page = Math.max(0, req.query.page);
  const options = {
    select:
      '_id date title subtitle skills detail link publish sourceCode images',
    sort: { date: -1 },
    offset: page ? pageSize * page : 0,
    limit: pageSize ? pageSize : 10
  };
  Portfolio.paginate({}, options, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong'
      });
    } else {
      res.status(200).json({
        portfolios: data.docs,
        total: data.total
      });
    }
  });
});

router.post('/', adminCheck, multiparty, (req, res, next) => {
  uploadImage(req.files.images, (error, uploadedImages) => {
    if (error) {
      return res.status(500).json({
        message: error
      });
    } else {
      const newPortfolio = new Portfolio({
        date: req.body.date,
        title: req.body.title,
        subtitle: req.body.subtitle,
        detail: req.body.detail,
        publish: false,
        link: req.body.link,
        sourceCode: req.body.sourceCode,
        skills: req.body.skills,
        images: uploadedImages
      });
      newPortfolio.save((err, saved) => {
        if (err) {
          return res.status(500).json({
            message: error
          });
        } else {
          res.status(200).json({
            saved
          });
        }
      });
    }
  });
});

const uploadImage = (images, callback) => {
  const uploadedImages = [];
  for (let i = 0; i < images.length; i++) {
    Gallary.uploadImage(images[i], (error, imageId) => {
      if (error) {
        return callback(error);
      } else {
        uploadedImages.push(imageId);
        if (images.length === i + 1) {
          return callback(null, uploadedImages);
        }
      }
    });
  }
};

module.exports = router;
