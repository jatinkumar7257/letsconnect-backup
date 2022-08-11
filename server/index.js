const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const jwtToken = require('jwt-token');
const cors = require('cors');
const app = express();

app.use(cors());

dotenv.config({path: './config.env'});
require('./db/conn');

const PORT = process.env.PORT;

app.use(express.json());

app.use(require('./router/auth'));

app.get('/', (req, res) => {
    res.send({
        "message": "getted"
    })
})

app.listen(PORT, (req, res) => {
    console.log("Connection Established Successfully !!");
});