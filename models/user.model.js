'use strict';

let mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let UserSchema = mongoose.Schema({
    password: {
        type: String,
        required: 'Please fill in a password'
    },
    fullName: {
        'type': String,
        'trim': true,
        'default': null
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowercase: true,
        required: 'Please fill in an email'
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId, ref: 'File'
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }],
    likedWines: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wine",
        },
    ],
}, {
    timestamps: true
});

// Add full-text search index
UserSchema.index({
    // "$**": "text"
    'fullName': 'text',
    'email': 'text'
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

// Generate new JWT when user is created from POST /api/users
// and concatenate this new JWT to the user's tokens property
UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const privateKey = process.env.JWT_SECRET;
    const token = jwt.sign({_id: user._id}, privateKey, { expiresIn: '1800s' });
    user.tokens = user.tokens.concat({token});

    await user.save();
    return token;
};


const User = mongoose.model('User', UserSchema);

module.exports = User;
