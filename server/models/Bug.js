const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    severity: {
        type: String,
        enum: ['None', 'Show Stopper', 'Critical', 'Major', 'Minor'],
        default: 'None',
        required: true
    },
    resolved: {
        type: Boolean,
        default: false
    },
    fixed: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    },
    reporter: mongoose.Schema.Types.ObjectId,
    reportee: mongoose.Schema.Types.ObjectId,
    image: {
        type: String
    },
}, { timestamps: {} });

mongoose.model('Bug', bugSchema);
// const mongoose = require('mongoose');

// const bugSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         unique: true,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     project: {
//         type: String,
//         required: true
//     },
//     severity: {
//         type: String,
//         enum: ['None', 'Show Stopper', 'Critical', 'Major', 'Minor'],
//         default: 'None',
//         required: true
//     },
//     resolved: {
//         type: Boolean,
//         default: false
//     },
//     fixed: {
//         type: Boolean,
//         default: false
//     },
//     verified: {
//         type: Boolean,
//         default: false
//     },
//     reporter: {
//         reporterId: mongoose.Schema.Types.ObjectId,
//         name: {
//             type: String
//         },
//         team: {
//             type: String,
//             enum: ['Frontend', 'Backend', 'UI/UX', 'Testing', 'Deployment', 'Management']
//         }
//     },
//     reportee: {
//         reporteeId: mongoose.Schema.Types.ObjectId,
//         name: {
//             type: String
//         },
//         team: {
//             type: String,
//             enum: ['Frontend', 'Backend', 'UI/UX', 'Testing', 'Deployment']
//         }
//     },
//     image: {
//         type: String
//     },
// }, { timestamps: {} });

// mongoose.model('Bug', bugSchema);