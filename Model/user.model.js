const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: { type: String },
    avatar: { type: String},
    email: { type: String },
    password: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
},{
    versionKey: false
});


const UserModel = mongoose.model("User", UserSchema);


module.exports = {
    UserModel
}