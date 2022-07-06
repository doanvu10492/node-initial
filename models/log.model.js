const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    action: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    params: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    diff: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Log', LogSchema);
