const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const generateToken = require("../Config/generateToken");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Enter all feilds");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const fetchUser = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const userExists = await User.findOne({ name });
    if(userExists) {
        res.status(201).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            eventsCreated : userExists.eventsCreated,
            eventsAttended : userExists.eventsAttended

        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

module.exports = { registerUser, fetchUser};