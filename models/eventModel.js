const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    name : {
      type : String,
      required : true
    },
    date : {
        type: Date,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    organiser : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    ratings : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating",
    },],
},
    {
        timestamps:true
    })
const Event = mongoose.model("Event",eventSchema)
module.exports = Event;