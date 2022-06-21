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
    // if usersliked already contains req payload userId it should return false 
    if (formattedLikeObj.userId == reqPayload.userId || formattedLikeObj.usersLiked.includes(reqPayload.userId)) {
        return false;
    }
    const res = {$inc: { likes: 0 }, $push: { usersLiked: [] }, _id: formattedLikeObj._id};
    res.$inc.likes++;
    res.$push.usersLiked.push(reqPayload.userId);
    return res;
}