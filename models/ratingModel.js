const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    value : {
        type : Number,
        required : true
    },
    likes : {
        type: Number
    },
    reportCount : {
        type: Number
    },
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    event : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event",
    },
        description : {
            type: String,
            trim: true
        },
    flag : Boolean,
    },
    {
        timestamps:true
    });
const Rating = mongoose.model("Rating",ratingSchema)
module.exports = Rating;