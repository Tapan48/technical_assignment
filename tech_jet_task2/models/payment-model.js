const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
    {
        userId: {
            type: Number,
            required: [true, "Please enter the user ID"]
        },
        amount: {
            type: Number,
            required: [true, "Please enter the payment amount"]
        },
        paid_status: {
            type: Boolean,
            default: true
        },
        time: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;   /// collection 
