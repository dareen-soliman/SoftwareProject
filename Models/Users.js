const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    profilePicture: { type: String }, 
    password: { 
        type: String, 
        required: true, 
        minlength: 6 
    },
    age: { 
        type: Number, 
        required: true, 
        min: 0 
    },
    role: { 
        type: String, 
        enum: ['standard', 'organizer', 'admin'], 
        default: 'standard' 
    },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);