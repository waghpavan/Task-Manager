const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },

    user: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ],
},
{ timestamps: true }
);

module.exports = mongoose.model("History", historySchema)