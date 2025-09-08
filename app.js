
const express = require("express")

const app = express();

const bcrypt = require('bcrypt');

app.get("/" , (req , res)=>{

    bcrypt.compare("polololoo", "$2b$10$AMHdStrG4ZaW3YKsj1ZXkuAkk9LIN5jjxQ2fZxnOXvPGA0.NxiQBW", function(err, result) {
        console.log(result);
    });
    });


app.listen(3000);