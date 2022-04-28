const express = require('express');
const app = express();
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth');


mongoose.connect('mongodb+srv://Nicolas:Nico11081995@cluster0.rnjtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use('/api/auth/signup', authRoutes);
app.use('/api/auth/login', authRoutes)