const express = require('express');
const router = express.Router();
const { User } = require('../class/user');
const { Session } = require('../class/session');

router.post('/signin', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Error! Required fields are empty!',
    });
  }

  try {
    const user = User.getByEmail(email);

    if (!user || user.password !== password) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    if (!user.isConfirmed) {
      return res.status(400).json({
        message: 'User is not confirmed',
      });
    }

    const session = Session.create(user);

    console.log(`User signed in: ${user.email}, token: ${session.token}`);

    return res.status(200).json({
      message: 'User signed in!',
      session,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Error! Sign in failed! ${err.message}`,
    });
  }
});

module.exports = router;
