const express= require("express")
const { protect} = require("../middleware/auth")
const {registerUser, fetchUser} = require("../controllers/userController")
const { fetchAllEvents, attendEvent }  = require("../controllers/eventController")
const {} = require("../controllers/ratingController")
const router = express.Router();

router.route('/').post(registerUser).get(protect, fetchUser);
router.route('/event').post(protect, attendEvent).get(protect, fetchAllEvents);
router.route('/event/rating').post(protect, giveRating);
module.exports= router;