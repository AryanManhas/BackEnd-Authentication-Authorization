const express = require("express")

const app = express();

app.get("/" , (req , res)=>{
    res.cookie("name" , "aryan");
    res.send("done")
})

app.listen(3000);