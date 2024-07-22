const express = require('express');
const router = express.Router();


let transactions = [
    
];


router.post('/send', (req, res) => {
    const { email, amount } = req.body;
    if (!email || !amount) {
        return res.status(400).json({ message: 'Email and amount are required' });
    }

    const newTransaction = {
        id: String(transactions.length + 1),
        name: email, 
        amount: parseFloat(amount),
        date: new Date().toISOString().slice(0, 10), 
        status: 'Sending',
    };

    transactions.push(newTransaction);
    console.log('New transaction:', newTransaction); 
    res.status(201).json({ transaction: newTransaction });
});

router.post('/receive', (req, res) => {
    const { amount, paymentSystem } = req.body;
    if (!amount || !paymentSystem) {
        return res.status(400).json({ message: 'Amount and payment system are required' });
    }

    const newTransaction = {
        id: String(transactions.length + 1),
        amount: parseFloat(amount),
        paymentSystem,
        date: new Date().toISOString().slice(0, 10),
        status: 'Received',
    };

    transactions.push(newTransaction);
    console.log('New receive transaction:', newTransaction);
    res.status(201).json({ transaction: newTransaction });
});

router.get('/transaction', (req, res) => {
    res.json({ transactions });
});

router.get('/transaction/:transactionId', (req, res) => {
    const { transactionId } = req.params;
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) {
        return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ transaction });
});

module.exports = router;
