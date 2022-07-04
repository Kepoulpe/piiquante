const Thing = require('../models/sauces');
const fs = require('fs');
const { markAsUntransferable } = require('worker_threads');
const { error, Console } = require('console');
const { likeDislikeSauceLogic } = require('./likeDislikeSauceLogic');

// user can create one sauce in the data base mongoDB
exports.createThing = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Thing({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
  if (req.file) {
    Thing.findOne({ _id: req.params.id })
      .then((sauce) => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
            .then(() => { res.status(200).json({ message: 'Sauce mise à jour!' }); })
            .catch((error) => { res.status(400).json({ error }); });
        })
      })
      .catch((error) => { res.status(500).json({ error }); });

  } else {
    Thing.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce mise à jour!' }))
      .catch((error) => res.status(400).json({ error }));
  }
};

// delete one sauce on the data base mongoDB
exports.deleteThing = (req, res, next) => {
    // find the right file and the picture link to this file
    Thing.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
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
exports.likeDislikeSauce = async (req, res, next) => {

    let sauceRecord;

    // 1) we check if the thing to update exists
    try {
        sauceRecord = await Thing.findOne({_id: req.params.id});
    } catch (error) {
        res.status(404).json({ error: "Sauce non trouvée !" });
        return;
    }

    // 2) we create a formatted object from the sauce obtained in MongoDB from previous step
    const {userId, likes, dislikes, usersLiked, usersDisliked} = sauceRecord;
    sauceRecord._id = req.params.id;

    // 3) we get the payload that we will use to actually update like/dislike data with MongoDB
    const updateLikeDislikeObj = likeDislikeSauceLogic(sauceRecord, req.body);

    // 3bis) send appropriate response if updateLikeDislikeObj is false (user tried to update likes data on his own sauce)
    if (!updateLikeDislikeObj) {
        res.status(403).json({error: `Cannot update sauce like/dislike data`});
        return;
    }

    // 4) we update the sauce data in MongoDB
    // 5) we send a response to the user
    try {
        console.log(updateLikeDislikeObj);
        await Thing.updateOne({ _id: sauceRecord._id }, updateLikeDislikeObj);
        res.status(200).json({error: `Updated sauce like/dislike data`});
    } catch (error) {
        res.status(500).json({error: `Could not update sauce like/dislike data, please try again later`});
    }

}
