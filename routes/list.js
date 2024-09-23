const router = require("express").Router();
const List = require("../models/list");
const User = require("../models/users");


router.post("/addTask", async(req, res) => {
    try {
        const {title, body, priority, id} = req.body;

        const existingUser = await User.findById(id);
        if(existingUser) {
            const list = new List({title, body, priority, user : existingUser});

            await list.save().then(() => res.status(200).json({list}));

            existingUser.list.push(list);
            existingUser.save();
        }
    }
    catch(error) {
        console.log(error);
        res.status(400).json({message : error});
    }
})


router.put("/updateTask", async(req, res) => {
    const {title, body, priority, _id} = req.body;

    try {
            const list = await List.findByIdAndUpdate(_id, {title, body, priority});
            list.save();
            res.status(200).json({list});
    }
    catch(error) {
        res.status(400).json({message : error});
    }
})


router.get("/getTask/:id", async(req, res) => {
    try { 
        const list = await List.find({user : req.params.id}).sort({createdAt : -1});
        if(list.length != 0) {
            res.status(200).json({list : list});
        } 
        else {
            res.status(200).json({message : "No Task Created Yet..."});  
        }
    }
    catch(error) {
        res.status(400).json({message : error});
    }
}) 


router.delete("/deleteTask/:id", async(req, res) => {
    try {
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(id, {$pull : {list : req.params.id}});
        if(existingUser) {
            await List.findByIdAndDelete(req.params.id).then(()=> res.status(200).json({message : "Your Task is Completed"}));
        }
    }
    catch(error) {
        console.log(error);
        res.status(400).json({message : error});
    }
})


module.exports = router;