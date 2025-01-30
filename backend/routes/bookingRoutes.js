const express = require("express");
const venueBookingController = require("../controllers/bookingControllers");

const router = express.Router();

// Create a new venue booking
router.post("/create", venueBookingController.createVenueBooking);

router.get("/user/:userId", venueBookingController.getBookingsByUser);

// Get all venue bookings
router.get("/get_all_bookings", venueBookingController.getAllBookings);

// // Get a single booking by ID
// router.get('/get_booking/:id', venueBookingController.getBookingById);

// // Update a booking by ID
// router.post('/update_booking/:id', venueBookingController.updateBooking);

module.exports = router;
