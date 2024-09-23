const express = require("express");
const cors = require("cors");
const path = require("path");

const con = require("./Connection/conn");

const auth = require("./routes/auth");
const list = require("./routes/list");
const history = require("./routes/history");


const app = express();

app.use(express.json())
app.use(cors());

con.connectDB();

app.use("/api/v1/", auth);
app.use("/api/v2/", list);
app.use("/api/v3/", history);

app.get('/', (req, res) =>{
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
})

app.listen(1000 ,() => {
    console.log("connected...");
});