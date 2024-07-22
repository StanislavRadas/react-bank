const express = require('express');
const router = express.Router();
const { User } = require('../class/user');
const { Session } = require('../class/session');
const { Confirm } = require('../class/confirm');

router.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Error! Required fields are empty!',
    });
  }

  try {
    const existingUser = User.getByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        message: 'This user already exists',
      });
    }

    const newUser = User.create({ email, password });
    const session = Session.create(newUser);
    const confirmation = Confirm.create(newUser.email);

    console.log(`New user created: ${newUser.email}, token: ${confirmation.token}`);

    return res.status(200).json({
      message: 'User is created!',
      session,
    });
  } catch (err) {
    return res.status(400).json({
      message: `Error! User is not created! ${err.message}`,
    });
  }
});

module.exports = router;
