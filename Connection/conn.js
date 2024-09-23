const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://pavanwagh:pavanmongodb@todoapp.n79tf.mongodb.net/").then(() => {
            console.log("connected to database...");       
        });
    }
    catch(error) {
        console.log(error);
    }
}

module.exports = {connectDB}