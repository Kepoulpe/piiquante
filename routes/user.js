const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/user');

// route for user can signup
router.post('/signup', authCtrl.signup);
    
// route for user can login
router.post('/login', authCtrl.login);
    

module.exports = router;
