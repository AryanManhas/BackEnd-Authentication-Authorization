const express = require("express")

const app = express();

app.get("/" , (req , res)=>{
    res.cookie("name" , "aryan");
    res.send("done")
})

app.get("/read" , (req , res)=>{
    res.send("read page")
})

app.listen(3000);