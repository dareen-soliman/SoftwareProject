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


/* userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual field for full name
userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Index for email
userSchema.index({ email: 1 }); 

*/

module.exports = mongoose.model('User', userSchema);