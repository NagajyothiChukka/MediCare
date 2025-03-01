require('dotenv').config();
const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log('Connected to Db');
    } catch (err) {
        console.log('Error in connecting Db');
    }
}

module.exports = connectToDb;