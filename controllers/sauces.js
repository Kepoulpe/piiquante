const Thing = require('../models/sauces');
const fs = require('fs');
const { markAsUntransferable } = require('worker_threads');
const { error, Console } = require('console');
const { likeDislikeSauceLogic } = require('./likeDislikeLogic');

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
    const updateLikeDislikeObj = likeDislikeSauceLogic(sauceRecord, req.body)

    // 3bis) send appropriate response if updateLikeDislikeObj is false (user tried to update likes data on his own sauce)

    // 4) we update the sauce data in MongoDB
    // TODO pass to Thing.updateOne the formatted update object => {$inc: { likes: 1 }, $push: { usersLiked: userId }, _id: sauceId}

    // 5) we send a response to the user

    // const sauceId = req.params.id
    // const userId = req.body.userId
    // const like = req.body.like

    // update sauce object in db with new like/dislike OR without previous like/dislike
    // switch (like) {
    //     // if like = 1, add userId to usersLiked array field in database
    //     case 1:
    //         Thing.updateOne({ _id: sauceId }, {
    //             $inc: { likes: 1 },
    //             $push: { usersLiked: userId },
    //             _id: sauceId
    //         })
    //         //     // return success message
    //             .then(() => {
    //                 res.status(201).json({ message: 'Like enregistré' });
    //                 console.log('Like sauce updated')
    //             })
    //             // return error message
    //             .catch((error) => {
    //                 res.status(400).json({ error: error });
    //                 console.log('Like not added')
    //             })
    //         break;

    //     // if like = -1, add userId to usersDisliked array field in database
    //     case -1:
    //         Thing.updateOne({ _id: sauceId }, {
    //             $inc: { dislikes: 1 },
    //             $push: { usersDisliked: userId },
    //             _id: sauceId
    //         })
    //             // return success message
    //             .then(() => {
    //                 res.status(201).json({ message: ' Dislike enregistré' });
    //                 console.log('Dislike sauce updated')
    //             })
    //             // return error message
    //             .catch((error) => {
    //                 res.status(400).json({ error: error });
    //                 console.log('Dislike not added')
    //             })
    //         break;

    //     // if like = 0, remove userId to usersLiked/usersDisliked array field in database
    //     case 0:
    //         Thing.findOne({sauceId})
    //             .then((sauce) => {
    //                 // user unlike
    //                 if (sauce.usersLiked.find(user => user === userId)) {
    //                     Thing.updateOne({ _id: sauceId }, {
    //                         $inc: { likes: -1 },
    //                         $pull: { usersLiked: userId },
    //                         _id: sauceId
    //                     })
    //                         // return success message
    //                         .then(() => {
    //                             res.status(201).json({ message: ' Like retiré' });
    //                             console.log('Like removed')
    //                         })
    //                         // return error message
    //                         .catch((error) => {
    //                             res.status(400).json({ error: error });
    //                             console.log('Like not removed')
    //                         })
                        
    //                 } else if (sauce.usersDisliked.find(user => user === userId)) { //user undislike
    //                     Thing.updateOne({ _id: sauceId }, { 
    //                         $inc: { dislikes: -1 },
    //                         $pull: { usersDisliked: userId },
    //                         _id: sauceId
    //                     })
    //                         // return success message
    //                         .then(() => {
    //                             res.status(201).json({ message: 'Dislike retiré' });
    //                             console.log('Dislike removed')
    //                         })
    //                         // return error message
    //                         .catch((error) => {
    //                             res.status(400).json({ error: error });
    //                         })
    //                 }
    //             })
    //             // sauce doesnt exist or not found
    //             .catch((error) => {
    //                 res.status(404).json({ error: error });
    //                 console.log('Sauce not found')
    //                 console.log(error)
    //             })
    //             break; 
    //     default:
    //         console.error('Something went wrong')
    // }
}
