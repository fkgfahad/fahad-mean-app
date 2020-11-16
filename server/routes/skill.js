const router = require('express').Router();

const Skill = require('../models/skill');

router.get('/', (req, res, next) => {
	Skill.find((err, skills) => {
		res.status(200).json({
			skills
		});
	});
});

module.exports = router;
