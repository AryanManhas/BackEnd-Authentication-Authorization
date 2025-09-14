const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userModel = require("./models/user");
const { log } = require("console");

app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname , "public")));

app.get("/" , (req , res)=>{
    res.render("index")
});

app.post("/create", async (req, res) => {
    const { username, email, password, age } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.send("User with this email already exists");
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) return res.send("Error hashing password");

            await userModel.create({
                username,
                email,
                password: hash,
                age
            });

            res.redirect("/login");
        });
    });
});



app.get("/login" , (req , res)=>
{
    res.render("login")
})

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Log entered email and password
    console.log("Entered Email:", email);
    console.log("Entered Password:", password);

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
        console.log("User not found");
        return res.send("User not found");
    }

    // Log the stored hashed password
    console.log("Stored Hashed Password:", user.password);

    // Compare the entered password with stored hash
    const isMatch = await bcrypt.compare(req.body.password, user.password); //req.body.password is current give password and user.password is saved password(hashed)
    if (!isMatch) {
        return res.send("Incorrect password");
    }


    // If match, create token and send response
    const token = jwt.sign({ email: user.email }, "shhhhhhhh");
    res.cookie("token", token);
    res.send("Login successful");
});




app.get("/logout" , (req , res)=>{
    res.cookie("token" , "")
    res.redirect("/")
})

// app.get("/logout" , (req , res)=>{
//     res.cookie("token" , "")
//     res.redirect("/")
// })
const port = 3000
app.listen(port , ()=> console.log(`Server Started at localhost://${port}`));