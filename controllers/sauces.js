const Thing = require('../models/sauces')
const fs = require('fs');

// user can create one sauce in the data base mongoDB
exports.createThing = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Thing({
        ...sauceObject,
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

// modify one specific sauce in the database mongoDB
exports.modifyThing = (req, res, next) => {
    // check if user modify the picture
    const sauceObject = req.file ?
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

// delete one sauce on the data base mongoDB
exports.deleteThing = (req, res, next) => {
    // find the right file and the picture link to this file
    Thing.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

// get one sauce in the data base mongoDB 
exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

// get all the sauces in the data base mongoDB
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

// post like/dislike for one sauce
exports.likeDislikeSauce = (req, res, next) => {
    // TODO if any of the validation questions fail, send an error message with the right status code
    // validate input payload
        // is userId present ?
        // is it a string ?
        // does that user exist in the database ?
        // is like present ?
        // is it a number ?
        // is like present in the array [0,1,-1] ?
    // validate input sauce
        // get the sauce id from the URL
        // does that sauceId exist in the database ?
    // update sauce object in db with new like/dislike OR without previous like/dislike
        // if like = 1, add userId to usersLiked array field in database
            // is the userId already present in the usersLiked array ?
                // if present return already Liked response
        // if like = 0, remove userId to usersLiked/usersDisliked array field in database
            // is the userId already present in the usersLiked/usersDisliked array ?
                // if not present return "there is no like/dislike" response
        // if like = -1, add userId to usersDisliked array field in database
            // is the userId already present in the usersDisliked array ?
                // if present return already Disliked response
        // update in db either usersLiked or usersDisliked array field
            // update likes/dislikes field accordingly based on usersLiked/usersDisliked array field length
        // return success message
}
