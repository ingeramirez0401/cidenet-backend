require('./config/config');

const express = require('express');
var bodyParser = require('body-parser');

const { dbConnection } = require('./database/config');

const app = express();

// Content/Json
app.use(bodyParser.json());

// Database Instance Init
dbConnection();

// Public Path
const path = require('path');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Routes
app.use(require('./routes/config.routes'));

app.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server run in PORT ${ process.env.PORT }`);
});