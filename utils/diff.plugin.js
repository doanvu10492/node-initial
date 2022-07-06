const _ = require('lodash');
const LogModel = require('../models/log.model');
const getDiff = require('./diff');

const plugin = function (schema) {

    schema.post('init', doc => {
        doc._original = doc.toObject({ transform: false });
    });

    schema.pre('save', function (next) {
        if (this.isNew) {
            next();
        } else {
            // this._diff = getDiff(this, this._original);
            next();
        }
    });

    schema.methods.log = function (data) {
        data.diff = JSON.stringify({
            before: this._original,
            // after: this._diff
        });

        return LogModel.create(data);
    }
};

module.exports = plugin;