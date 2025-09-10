const express = require("express");

const path = require("path");

const app = express();

const userModel = require("./models/user")

app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , (req , res)=>{
    res.render("index")
});

app.post("/create" , async (req , res)=>{
    let {username , email , password , age} = req.body

    let createdUser = await userModel.create({
        username ,
        email,
        password,
        age
    })
    res.send(createdUser)
});

app.listen(3000);