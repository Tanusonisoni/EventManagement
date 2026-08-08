import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    eventId: {
        type: Schema.Types.ObjectId,
        ref: "event",
        required: true
    },
    transactionId: {
        type: String,
        default: null
    },
    isCancelled: {
        type: Boolean,
        default: false
    },
    isRefunded: {
        type: Boolean,
        default: false
    },
    refund_amount: {
        type: Number,
        default: 0
    },
    payment_mode: {
        type: String,
        enum: ['card', 'upi', 'netbanking', 'wallet'],
        default: null
    },
    payment_status: {
        type: String,
        enum: ['pending', 'success', 'failed'],
        default: 'success'
    },
    booked_tickets: {
        vip_tickets: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            required: true
        },
        general_tickets: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5],
            required: true
        }
    },
    category: {
        type: String,
        enum: ["general", "premium"],
        required: true
    }
}, { timestamps: true });

const bookingModel = model('booking', bookingSchema);

export default bookingModel;