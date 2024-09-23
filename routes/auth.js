const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcryptjs");

// Sign Up :
router.post("/register", async(req, res) => {
    try {

        const {email , username, password} = req.body;

        // bcrypt the password for protection...
        const hashPass = bcrypt.hashSync(password)

        // Creating a new User using these details... 
        const user = new User({email, username, password : hashPass});

        // save means create and save in mongoDB storage 
        await user.save().then(() =>
            res.status(200).json(user)
        )
    }
    catch(error) {
        res.status(200).json({message : "Already Exists!!!"});
    }
})


// Log In : 
router.post("/login", async(req, res) => {
    try {
        const {email, pass} = req.body;

        // Check User is Exists or not
        const user = await User.findOne({"email" : email});
        if(!user) {
            res.json({message : "User not available, Please Sign Up..."});
            return;
        }
        
        // According to user check password is correct or not...
        const correctPass = bcrypt.compareSync(pass, user.password);
        if(!correctPass) {
            res.json({message : "Incorrect Password..."});
            return;
        }

        // Expect password it will give other all things in other variable...
        // ... dots are for all;
        // EveryThing is correct   So creating response of data...
        const {password, ...other} = user._doc;
        res.status(200).json({other});
    }
    catch(error) {
        console.log(error);
        res.status(200).json({message : "Invalid Details"});
    }
})



module.exports = router;