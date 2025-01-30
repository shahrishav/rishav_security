const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordOTP : {
        type : Number,
        default : null
    },
    resetPasswordExpires : {
        type : Date,
        default : null
    },
    role: {
        type: String,
        default: 'user'
    },
    loginAttempts:{
        type : Number,
        default : 0
    },
    lockUntil:{
        type : Date,
    }
});

const User = mongoose.model('users', userSchema)

module.exports = User;