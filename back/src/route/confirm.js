const express = require('express');
const router = express.Router();
const { Confirm } = require('../class/confirm');
const { User } = require('../class/user');

router.post('/confirm', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      message: 'Error! Token is required!',
    });
  }

  console.log(`Received token for confirmation: ${token}`);

  try {
    const confirm = Confirm.getByToken(token);

    if (!confirm) {
      return res.status(400).json({
        message: 'Invalid token',
      });
    }

    const user = User.getByEmail(confirm.email);

    if (!user) {
      return res.status(400).json({
        message: 'User not found',
      });
    }

    user.isConfirmed = true;
    Confirm.remove(token);

    console.log(`User confirmed: ${user.email}`);

    return res.status(200).json({
      success: true,
      message: 'User confirmed!',
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Error! Confirmation failed!',
    });
  }
});

module.exports = router;

