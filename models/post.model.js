'use strict';

const mongoose = require('mongoose');
const plugins = require('../utils/diff.plugin.js');

let PostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        index: true,
    },
    description: String,
    cateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
});

PostSchema.plugin(plugins);

// Add full-text search index
// PostSchema.index({
//     'tinh_trang': 'text'
// });

module.exports = mongoose.model('Post', PostSchema);
