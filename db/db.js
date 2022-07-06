const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);
mongoose.connection.on(
    "connected", (err, res) => {
        console.log("mongoose is connected");
    },
    "error", (err) => {
        console.log("err", err);
    }
);

const diffPlugin = require('../utils/diff.plugin.js');
mongoose.plugin(diffPlugin);