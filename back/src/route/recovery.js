const express = require('express');
const router = express.Router();
const { User } = require('../class/user'); 

function generateRecoveryCode() {
    let recoveryCode = '';
    for (let i = 0; i < 6; i++) {
        recoveryCode += Math.floor(Math.random() * 10);
    }
    return recoveryCode;
}

router.post('/recovery', async (req, res) => {
    const { email } = req.body;

    try {
        const recoveryCode = generateRecoveryCode();
        const user = User.getByEmail(email);
        if (user) {
            user.recoveryCode = recoveryCode;
        } else {
            throw new Error('User not found');
        }

        console.log(`Recovery code for ${email}: ${recoveryCode}`);
        res.status(200).json({ recoveryCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to generate recovery code' });
    }
});

router.post('/recovery-confirm', async (req, res) => {
    const { code, newPassword } = req.body;

    try {
        const user = User.getList().find((user) => user.recoveryCode === code);
        if (!user) {
            throw new Error('Invalid recovery code');
        }

        user.password = newPassword;

        user.recoveryCode = null;

        console.log(`Password changed for ${user.email} to ${newPassword}`);

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});



module.exports = router;



