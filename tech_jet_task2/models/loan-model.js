const mongoose = require('mongoose');

const loanSchema = mongoose.Schema(
    {
        amount: {
            type: Number,
            required: [true, "Please enter the loan amount"]
        },
        tenure: {
            type: String,
            required: [true, "Please enter the loan tenure"]
        },
        userId: {
            type: Number,
            required: [true, "Please enter the user ID"]
        }
    },
    {
        timestamps: true
    }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;   /// collection
