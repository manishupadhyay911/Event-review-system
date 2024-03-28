const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema= mongoose.Schema({
        name: { type:String,
            required:true
        },
        email: { type:String,
            required:true,
            unique:true
        },
        password: { type:String
            ,required:true
        },
        eventsAttended : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event",
        },],
        eventsCreated : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event",
        },],
        ratings : [{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Rating",
        }]
    },
    {
        timestamps:true
    })
userSchema.methods.matchPassword = async function(userpassword){
    return await bcrypt.compare(userpassword,this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
} )
const User = mongoose.model("User",userSchema);

module.exports=User;
