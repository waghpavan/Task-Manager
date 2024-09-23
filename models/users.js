const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        unique : true
    },

    password : {
        type : String,
        required : true
    },

    list : [
        {
            type : mongoose.Types.ObjectId,
            ref : "List"
        }
    ],

    hist : [
        {
            type : mongoose.Types.ObjectId,
            ref : "History"
        }
    ]
})

module.exports = mongoose.model("User" , userSchema);