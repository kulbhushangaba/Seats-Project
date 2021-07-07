const Joi = require('joi');
const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    phone: {
        type: String
    },
    tnc: {
        type: Boolean
    },
    latest_update: {
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    utype: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    token_generate_time: {
        type: Date,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);