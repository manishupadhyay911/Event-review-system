const express= require("express")
const { protect} = require("../middleware/auth")
const {registerUser, fetchUser,loginUser} = require("../controllers/userController")
const { fetchAllEvents, attendEvent }  = require("../controllers/eventController")
const {giveRating,
    likeReview,
    reportReview,
    respondToReview,
    fetchSummary,
    fetchAllRating} = require("../controllers/ratingController")
const router = express.Router();

router.route('/').post(protect, giveRating);
router.route('/like').post(protect, likeReview);
router.route('/report').post(protect, reportReview);
router.route('/respond-review').post(protect, respondToReview);
router.route('/all-review').get(protect, fetchAllRating);
router.route('/review-summary').get(protect, fetchSummary);

module.exports= router;