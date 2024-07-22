const express = require('express');
const router = express.Router();
const { User } = require('../class/user');

router.post('/settings/change-email', (req, res) => {
    const { email, newEmail } = req.body;

    if (!email || !newEmail) {
        return res.status(400).json({
            message: 'Error! Required fields are empty!',
        });
    }

    try {
        let user = User.getByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        user.email = newEmail;

        console.log(`Email changed for ${user.email} to ${newEmail}`); 

        return res.status(200).json({
            message: 'Email changed successfully',
        });
    } catch (err) {
        console.error('Error while changing email:', err);
        return res.status(500).json({
            message: `Error! Email change failed! ${err.message}`,
        });
    }
});

router.post('/settings/change-password', (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({
            message: 'Error! Required fields are empty!',
        });
    }

    try {
        let user = User.getByEmail(email);

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        if (user.password !== oldPassword) {
            return res.status(400).json({
                message: 'Invalid password',
            });
        }

        user.password = newPassword;

        console.log(`Password changed for ${user.email}`);

        return res.status(200).json({
            message: 'Password changed successfully',
        });
    } catch (err) {
        console.error('Error while changing password:', err); 
        return res.status(500).json({
            message: `Error! Password change failed! ${err.message}`,
        });
    }
});

router.post('/settings/logout', (req, res) => {
    return res.status(200).json({
        message: 'Logout successful',
        redirectTo: '/'
    });
});

module.exports = router;

