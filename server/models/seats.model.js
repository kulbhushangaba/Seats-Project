const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SeatsSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    left: {
        type: String,
        required: true
    },
    right: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Seat', SeatsSchema);