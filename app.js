const express = require("express");
const path = require("path");
const app = express();
const postModel = require("./models/post")
const userModel = require("./models/user")

app.get("/" , (req , res)=>{
    return res.send("Hey")
})

app.get("/create" , async (req , res)=>{
})

app.get("/post/create" , async (req , res)=>{
    let post  = await postModel.create({
        postdata : "Hello",
        user : "68c719b806a086e89db00c82"
    })
    let user = await userModel.findOne ({_id : "68c719b806a086e89db00c82"})
    user.posts.push(post._id)
    await user.save();
    res.send({post ,  user})
})

const port = 3000;
app.listen(port, () => 
  console.log(`Server Started at http://localhost:${port}`)
);
