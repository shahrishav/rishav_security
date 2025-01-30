const express = require('express');
const venueController = require('../controllers/venueControllers');
const { authGuard, AdminGuard } = require('../middleware/authGuard');

const router = express.Router();


router.post('/create',AdminGuard, venueController.createVenue);


router.get('/get_all_venues', venueController.getAllVenues);


router.get('/get_venue/:id', venueController.getVenueById);

router.post('/update_venue/:id',AdminGuard, venueController.updateVenue);

router.post('/delete_venue/:id',AdminGuard, venueController.deleteVenue);

router.get('/get_venues_by_venue/:venueId', venueController.getVenuesByCategory);

router.get("/pagination", venueController.paginationVenues);

module.exports = router;
