const router = require("express").Router();
const History = require("../models/history");
const User = require("../models/users");

router.get("/history/:id", async(req, res)=>{
    try {
        const id = req.params.id;
        console.log(id);
        
        const history = await History.find({user : id}).sort({createdAt : -1})
        // console.log(history);
        
        if(history.length != 0) {
            res.status(200).json({history : history});
        }
        else {
            res.status(200).json({message : "No Task Completed Yet !!!"});
        }
    }
    catch(error) {
        res.status(400).json({message : error});
    }
});

router.post("/addHistory", async (req, res) => {
    try {
        const { title, body, priority, id } = req.body;

        const existingUser = await User.findById(id);
        if (existingUser) {
            const hist = new History({ title, body, priority, user: existingUser });

            await hist.save();

            // Add history to user and save the user
            existingUser.hist.push(hist);
            await existingUser.save();

            // Send response only once
            return res.status(200).json({ message: "History added successfully"});
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: error.message });
    }
});


module.exports = router;