const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// user can create one thing in the data base mongoDB
router.post('/', auth, multer, saucesCtrl.createThing);

// modify one specific thing in the database mongoDB
router.put('/:id', auth, multer, saucesCtrl.modifyThing);

// delete one thing on the data base mongoDB
router.delete('/:id', auth, saucesCtrl.deleteThing);

// get one thing in the data base mongoDB 
router.get('/:id', auth, saucesCtrl.getOneThing);

// get all the things in the data base mongoDB
router.get('/', auth, saucesCtrl.getAllThings);

router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);

module.exports = router;