'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

require('./db/db');

const app = express();

// Parse requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routers/product')(app);
require('./routers/user')(app);
require('./routers/post')(app);
require('./routers/category')(app);

const PORT = process.env.PORT;
const HOST = process.env.HOST;

console.log(`port ${PORT}`);
app.listen(PORT, HOST); 

console.log(`Server is running on http://${HOST}:${PORT}`);