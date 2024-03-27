const asyncHandler = require("express-async-handler");
const Organiser = require("../models/organiserModel");
const generateToken = require("../Config/generateToken");


const registerOrganiser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Enter all feilds");
    }

    const organiserExists = await Organiser.findOne({ email });
    if (organiserExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const organiser = await Organiser.create({
        name,
        email,
        password
    });
    if (organiser) {
        res.status(201).json({
            _id: organiser._id,
            name: organiser.name,
            email: organiser.email,
            token: generateToken(organiser._id),
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

fetchOrganiser = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const organiser = await Organiser.findOne({ name });
    if(organiser) {
        res.status(201).json({
            _id: organiser._id,
            name: organiser.name,
            email: organiser.email
        });
    }
    else {
        res.status(400);
        throw new Error("Failed to create user");
    }

});

module.exports = { registerOrganiser};