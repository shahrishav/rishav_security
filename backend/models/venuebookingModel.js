const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const venueBookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    venue: {
        type: Schema.Types.ObjectId,
        ref: 'Venue',
        required: true,
    },
    checkInDate: {
        type: Date,
        required: true,
    },
    checkOutDate: {
        type: Date,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Booked', 'Cancelled'],
        default: 'Booked',
    },
});

module.exports = mongoose.model('VenueBooking', venueBookingSchema);
