const router = require('express').Router();

const Testimonial = require('../models/testimonial');
const adminCheck = require('../middlewares/admin');

router.get('/', (req, res) => {
  const pageSize = +req.query.pagesize;
  const page = Math.max(0, req.query.page);
  const options = {
    select: '_id name speech',
    sort: { date: -1 },
    offset: page ? pageSize * page : 0,
    limit: pageSize ? pageSize : 10
  };
  Testimonial.paginate({ show: true }, options, (err, data) => {
    res.status(200).json({
      testimonials: data.docs,
      total: data.total
    });
  });
});

router.get('/admin', adminCheck, (req, res) => {
  const pageSize = +req.query.pagesize;
  const page = Math.max(0, +req.query.page);
  const options = {
    select: '_id date name speech show',
    sort: { date: -1 },
    offset: page ? pageSize * page : 0,
    limit: pageSize ? pageSize : 10
  };
  Testimonial.paginate({}, options, (err, data) => {
    res.status(200).json({
      testimonials: data.docs,
      total: data.total
    });
  });
});

router.post('/', adminCheck, (req, res) => {
  const newTst = new Testimonial({
    date: req.body.date,
    name: req.body.name,
    speech: req.body.speech,
    show: false
  });
  newTst.save((error, testimonial) => {
    if (error) {
      return res.status(500).json({
        message: 'Wrong happened'
      });
    } else {
      res.status(201).json({
        message: 'Testimonial saved successfully'
      });
    }
  });
});

router.put('/status', adminCheck, (req, res) => {
  Testimonial.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { show: req.body.status } },
    { new: true },
    (error, updatedTst) => {
      if (error) {
        return res.status(200).json({
          message: 'Testimonial updating failed.'
        });
      } else {
        console.log(updatedTst);
        res.status(201).json({
          message: 'Update successful',
          show: updatedTst.show
        });
      }
    }
  );
});

router.delete('/:testimonialId', adminCheck, (req, res) => {
  Testimonial.findOneAndDelete({ _id: req.params.testimonialId }, (error) => {
    if (error) {
      return res.status(500).json({
        message: 'Testimonial deletion failed'
      });
    } else {
      res.status(201).json({
        message: 'Testimonial deleted'
      });
    }
  });
});

module.exports = router;
