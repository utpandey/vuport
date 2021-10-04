// const mongoose = require('mongoose');

// const album = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
// }, { timestamps: {} });

// album.statics.findByUser = function(userId) {
//     return this.find({ user: userId })
//         //.sort({createdAt: -1})
//         .then(albums => {
//             //if (!albums) throw {status: 400, message: 'No albums found.'};
//             return albums;
//         });
// };

// mongoose.model('Album', album);
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }]
}, { timestamps: {} });

mongoose.model('Album', imageSchema);