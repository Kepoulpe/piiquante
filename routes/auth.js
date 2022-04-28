const express = require('express');
const router = express.Router();

const authCtrl = require('../controllers/auth');

// route for user can signup
router.post('/signup', authCtrl.authSignup);
    
// route for user can login
router.post('/login', authCtrl.authLogin);
    

module.exports = router;
