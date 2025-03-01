require('dotenv').config();
const express = require('express');
const connectToDb = require('./config/mongo.config');
const userRoute = require('./routes/user.routes');

const app = express();

app.use(express.json());

app.use('/users', userRoute)

app.get('/', (req, res) => {
    res.send('This is a test route');
});

app.listen(process.env.PORT, async () => {
    try {
        await connectToDb();
        console.log('Server Started');
    } catch (err) {
        console.log(err);
    }
});