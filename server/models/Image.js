const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    album: {
        default: null,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: {} });

mongoose.model('Image', imageSchema);