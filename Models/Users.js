const { type } = require('os');
const mongoose = require('mongoose');
const { timeStamp } = require('console');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }, 
    password: { type: String, required: true },
    age:{ type: Number, required: true },
    role: { type: String, enum: ['standard', 'organizer', 'admin'], default: 'standard' },
    createdAt: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('User', userSchema);