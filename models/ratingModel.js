const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
    overall : {
        type : Number,
        required : true
    },
        registrationExp : {
            type : Number,
            required : true
        },
        eventExp : {
            type : Number,
            required : true
        },
        breakfastExp : {
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
        likedBy : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
        reportedBy : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }],
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