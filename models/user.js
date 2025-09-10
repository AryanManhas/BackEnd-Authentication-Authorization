const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);

const userSchema = mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true, // 🚨 This prevents duplicates at DB level
    },
    password: String,
    age: Number
});

module.exports = mongoose.model("user", userSchema);
