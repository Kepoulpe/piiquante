require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const userRoutes = require('./routes/user');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/api/auth', userRoutes);