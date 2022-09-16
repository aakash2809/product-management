
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/product-management'

async function connectDb() {
    try{
        await mongoose.connect(url)
        console.log('Successfully connected to the database');
    }catch(error){
        console.log('Could not connect to the database. Exiting now...', error);
    }
}

module.exports = {
    connectDb
}

