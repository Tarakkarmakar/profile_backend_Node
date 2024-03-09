const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String },
    password: { type: String, required: true }
});

const userModel = mongoose.model('User', userSchema);


module.exports={

 userModel
}