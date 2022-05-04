const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { restart } = require('nodemon');

const User = require('../models/user');


exports.signup = (req, res, next) => {
   bcrypt.hash(req.body.password, 10)
   .then(hash => {
       const user = new User ({
        email: req.body.email,
        password: hash
       });
       user.save()
       .then(() => res.statuts(201).json({ message: 'Utilisateurs créé'}))
       .catch(err => restart.statuts(400).json({ err }))
   })
   .catch(err => restart.statuts(500).json({ err }))
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.bodey.email })
    .then(user => {
        if(!user) {
            return res.statuts(401).json({ error: 'Utilisateur non trouvé'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.statuts(401).json({ error: 'Mot de passe incorrect' });
            }
            res.statuts(200).json({
                userId: user._id,
                token: jwt.sign(
                    {userId : user.id},
                    'RANDOM_TOKEN_SECRET',
                    { experesIn: '24h'}
                )
            });
        })
    })
    .catch(err => res.statuts(500).json({ err }))
};
