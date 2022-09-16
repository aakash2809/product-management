const express = require('express');
const { connectDb } = require('./config/dbconfig');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>{
    console.log('server conneted on port', PORT);
});

connectDb();