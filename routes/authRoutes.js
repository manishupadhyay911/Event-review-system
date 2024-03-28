const express= require("express")
const {registerUser, fetchUser,loginUser} = require("../controllers/userController")
const router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/user').post(fetchUser);

module.exports= router;