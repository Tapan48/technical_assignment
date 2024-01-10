const express = require('express')
const mongoose = require('mongoose')
const Loan = require('./models/loan-model'); 
const Payment = require('./models/payment-model');
const app = express()
// const port=3000;
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("Hello task2");
  });


  // API to get all users who applied for a loan
app.get('/all-loan-applicants', async (req, res) => {
    try {
        const allLoanApplicants = await Loan.find({}, 'userId amount tenure');
        res.status(200).json(allLoanApplicants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




  /// loan-application
app.post('/apply-loan', async (req, res) => {
    try {
        // const { amount, tenure, userId } = req.body;
        // const loan = new Loan({ amount, tenure, userId });

        const loan = await Loan.create(req.body);
        
        // res.status(201).json({ message: 'Loan applied successfully' });
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/// pay-instalments         /// every minute this request should be made, tenure times request
app.post('/pay-instalments', async (req, res) => {
    try {
        const { amount, userId } = req.body;

        // Assuming payment is done every 1 minute (as mentioned in the description)
        const time = new Date().toLocaleTimeString();

        // const payment = new Payment({
        //     userId,
        //     amount,
        //     paid_status: true, // Assuming payment is successful by default
        //     time
        // });
        const payment=await Payment.create(req.body);

        await payment.save();

        res.status(200).json({ message: 'Instalment paid successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



/// payment history api
app.get('/payment-history/:userId', async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        // Fetch loan amount for the user
        const loan = await Loan.findOne({ userId });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found for the user' });
        }

        const loanAmount = loan.amount;

        // Fetch payments for the user
        const payments = await Payment.find({ userId });

        // Calculate due amount based on the loan amount
        const totalAmount = loanAmount;
        const paidAmount = payments.filter(payment => payment.paid_status).reduce((total, payment) => total + payment.amount, 0);
        const dueAmount = totalAmount - paidAmount;

        const paymentHistory = payments.map(payment => ({
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




 
mongoose.                            // cluster                       //database
connect('mongodb+srv://admin:admin123@product-api.rs4rr0c.mongodb.net/payments?retryWrites=true&w=majority',

)  /// cluster,database 
.then(() => {
    console.log('connected to Mongodb')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})