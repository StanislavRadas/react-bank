const express = require('express');
const router = express.Router();

const signup = require('./signup');
const confirm = require('./confirm');
const signin = require('./signin');
const recovery = require('./recovery');
const settings = require('./settings');
const send = require('./send');

router.use('/', signup);
router.use('/', confirm);
router.use('/', signin);
router.use('/', recovery);
router.use('/', settings);
router.use('/', send);

router.get('/', (req, res) => {
  res.status(200).json('Hello World');
});

module.exports = router;
