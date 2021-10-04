const express = require('express');
const app = express()
const cors = require('cors')
const serverConfig = require('./config');
const mongoose = require('mongoose');
const server = require('./models');
require('./models/Album');
require('./models/Image');
require('./models/User');;
const authRoutes = require('./routes/auth');
const albumRoutes = require('./routes/album');
const imageRoutes = require('./routes/image');
const { generateUploadURL } = require('./middlewares/s3');

// mongoose.connect(server.connectionUri, server.connectionOptions)
//     .then(() => console.log('Connection to database has been established'))
//     .catch((error) => console.log('Connection could not be established', error));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(albumRoutes);
app.use(imageRoutes);

app.use(express.static('frontend'))

app.get('/s3Url', async(req, res) => {
    const url = await generateUploadURL()
    res.send({ url })
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err) => {
    console.log("This is error", err)
})

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
    console.log("Server running: " + port)
})

server.connect();

module.exports = app;