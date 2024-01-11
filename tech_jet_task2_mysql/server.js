const express = require('express');
const mysql = require('mysql2/promise'); // Using promise version for async/await support
const Loan = require('./models/loan-model');
const Payment = require('./models/payment-model');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_mysql_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/", (req, res) => {
  res.send("Hello task2");
});

app.get('/all-loan-applicants', async (req, res) => {
  try {
    const [rows, fields] = await pool.execute('SELECT userId, amount, tenure FROM Loan');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/apply-loan', async (req, res) => {
  try {
    const [result] = await pool.execute('INSERT INTO Loan (userId, amount, tenure) VALUES (?, ?, ?)', [
      req.body.userId,
      req.body.amount,
      req.body.tenure
    ]);

    const insertedId = result.insertId;
    res.status(200).json({ id: insertedId, ...req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/pay-instalments', async (req, res) => {
  try {
    const [result] = await pool.execute('INSERT INTO Payment (userId, amount, paid_status, time) VALUES (?, ?, ?, NOW())', [
      req.body.userId,
      req.body.amount,
      true // Assuming payment is always successful for simplicity
    ]);

    const insertedId = result.insertId;
    res.status(200).json({ id: insertedId, message: 'Instalment paid successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/payment-history/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Fetch loan amount for the user
    const [loanRows] = await pool.execute('SELECT amount FROM Loan WHERE userId = ?', [userId]);
    if (loanRows.length === 0) {
      return res.status(404).json({ message: 'Loan not found for the user' });
    }

    const loanAmount = loanRows[0].amount;

    // Fetch payments for the user
    const [paymentRows] = await pool.execute('SELECT * FROM Payment WHERE userId = ?', [userId]);

    // Calculate due amount based on the loan amount
    const totalAmount = loanAmount;
    const paidAmount = paymentRows.filter(payment => payment.paid_status).reduce((total, payment) => total + payment.amount, 0);
    const dueAmount = totalAmount - paidAmount;

    const paymentHistory = paymentRows.map(payment => ({
      paid_status: payment.paid_status,
      time: payment.time,
      amount: payment.amount
    }));

    res.status(200).json({
      Response: {
        Payment_history: paymentHistory,
        due_amount: dueAmount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Node API app is running on port 3000');
});
