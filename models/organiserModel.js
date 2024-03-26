const mongoose = require("mongoose");

const organiserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
        , required: true
    },
    eventsCreated : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
    },],

},
    {
        timestamps:true
    });

const Organiser = mongoose.model("Organiser",organiserSchema)
module.exports = Organiser;