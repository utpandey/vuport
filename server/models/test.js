const mongoose = require('mongoose');

const igeSchema = new mongoose.Schema({
    link: {
        type: String,
        unique: true,
        required: true
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: {} });


mongoose.model('Test', igeSchema);