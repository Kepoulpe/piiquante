const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const authCtrl = require('../controllers/user');

// route for user can signup
router.post(
    '/signup', 
    body('email').isEmail(),
    body('password')
        .isLength({ min: 8 })
        .custom(pwd => {
            let re = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]', 'g');
            if (!re.test(pwd)) {
                throw new Error('Your password must be 8 characters at least and should include letters, numbers, and symbols');
            }
            return true;
        }),
    (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
        };
        next()
    },
    authCtrl.signup
);
    
// route for user can login
router.post('/login', authCtrl.login);
    

module.exports = router;
