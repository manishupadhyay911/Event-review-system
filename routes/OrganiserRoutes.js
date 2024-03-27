const express= require("express")
const {createEvent, fetchEvent }  = require("../controllers/eventController")
const {protect} = require("../middleware/auth");
const router = express.Router();

router.route('/event').post(protect, createEvent).get(protect, fetchEvent);
module.exports= router;