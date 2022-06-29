/**
 * 
 * @description handles the logic of liking disliking a sauce
 * 
 * @param {Object} formattedLikeObj the sauce from the database, formatted for this logic {userId, likes, dislikes, usersLiked, usersDisliked, _id}
 * @param {like: number, userId: string} reqPayload the incoming request payload
 * 
 * @returns {$inc: { likes: number }, $push: { usersLiked: string[] }, _id: string} // _id is the id from MongoDB
 * 
 * ! can also return false
 * 
 */
exports.likeDislikeSauceLogic = (formattedLikeObj, reqPayload) => {
    const like = reqPayload.like;
    // this if block is for the case the user who has created a sauce tries to update its like data
    // this other if bloc is for the case a user tries to like/dislike a sauce twice
    if (
        formattedLikeObj.userId == reqPayload.userId
        || like === 1 && formattedLikeObj.usersLiked.includes(reqPayload.userId)
        || like === -1 && formattedLikeObj.usersDisliked.includes(reqPayload.userId)
    ) {
        return false;
    }
    switch (like) {
        case 1:
            if (formattedLikeObj.usersDisliked.includes(reqPayload.userId)) {
                const resLike = { $inc: { likes: formattedLikeObj.likes },$inc: { dislikes: formattedLikeObj.likes },$pull: { usersDisliked: formattedLikeObj.usersDisliked }, $push: { usersLiked: formattedLikeObj.usersLiked }, _id: formattedLikeObj._id };
                resLike.$inc = { likes: 1 }
                resLike.$inc = { dislikes: -1 }
                resLike.$push.usersLiked.push(reqPayload.userId)
                resLike.$pull = { usersDisliked: reqPayload.userId };
                return resLike;
            } else {
                const resLike = { $inc: { likes: formattedLikeObj.likes }, $push: { usersLiked: formattedLikeObj.usersLiked }, _id: formattedLikeObj._id };
                resLike.$inc = { likes: 1 }
                resLike.$push.usersLiked.push(reqPayload.userId);
                return resLike;
            }


        case -1:
            const resDislike = { $inc: { dislikes: formattedLikeObj.dislikes }, $push: { usersDisliked: formattedLikeObj.usersDisliked }, _id: formattedLikeObj._id };
            resDislike.$inc = { dislikes: 1 }
            resDislike.$push.usersDisliked.push(reqPayload.userId);
            return resDislike;
        case 0:
            // if usersDisliked already contains req payload userId it should remove 1 from the dislikes count and remove userId from the usersDislikd array
            if (formattedLikeObj.usersDisliked.includes(reqPayload.userId)) {
                const resUndislike = { $inc: { dislikes: formattedLikeObj.dislikes }, $pull: { usersDisliked: formattedLikeObj.usersDisliked }, _id: formattedLikeObj._id };
                resUndislike.$inc = { dislikes: -1 }
                resUndislike.$pull = { usersDisliked: reqPayload.userId };
                return resUndislike;
            } else if (formattedLikeObj.usersLiked.includes(reqPayload.userId)) {
                const resUnLike = { $inc: { likes: formattedLikeObj.likes }, $pull: { usersLiked: formattedLikeObj.usersLiked }, _id: formattedLikeObj._id };
                resUnLike.$inc = { likes: -1 }
                resUnLike.$pull = { usersLiked: reqPayload.userId };
                return resUnLike;
            }
        default:
            console.log("Something went wrong");
            return false;
    }


};
