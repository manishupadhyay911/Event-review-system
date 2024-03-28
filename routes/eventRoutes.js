const express= require("express")
const { protect} = require("../middleware/auth")
const { fetchAllEvents, attendEvent, createEvent, fetchEvent}  = require("../controllers/eventController")
const router = express.Router();

router.route('/create').post(protect, createEvent);
router.route('/attend').post(protect, attendEvent);
router.route('/all-events').get(protect, fetchAllEvents);
router.route('/').get(protect, fetchEvent);

module.exports= router;