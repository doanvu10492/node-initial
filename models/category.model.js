'use strict';

const mongoose = require('mongoose');
let CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        index: true,
    },
    description: String
}, {
    timestamps: true
});

// Add full-text search index
// PostSchema.index({
//     'tinh_trang': 'text'
// });

module.exports = mongoose.model('Category', CategorySchema);
