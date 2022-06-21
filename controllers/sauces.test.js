const sauceLogic = require("./likeDislikeLogic");
const likeDislikeSauceLogic = sauceLogic.likeDislikeSauceLogic;

// test suite
describe("testing like/dislike", () => {

    it("given a user who has created a sauce, when he wants to update like/dislike data, then he cant", () => {
        // arrange
        const expected = false;
        const testInitialSauce = {
            _id: "1234",
            userId: "x", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: 1,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toBeFalsy();
    });

    it("given a user who has NOT created a sauce, when he likes a sauce, then the likes prop of the sauce is incremented by 1", () => {
        // arrange
        const expected = {$inc: { likes: 1 }, $push: { usersLiked: ["x"] }, _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: 1,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    it("given a user who has NOT created a sauce, when he likes a sauce, then his userId should be pushed to the usersLiked array", () => {
        // arrange
        const expected = {$inc: { likes: 1 }, $push: { usersLiked: ["x"] }, _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: 1,
            userId: "x"
        }
        // // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // // assert
        expect(actual).toEqual(expected);
    });

    it("given a user who has NOT created a sauce, when he likes a sauce that he has already liked, then it should return false", () => {
        // arrange
        const expected = false;
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: ["x"], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: 1,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

});


// userId: '6298d87392fc5f24573a1c86',
// likes: 0,
// dislikes: -1,
// usersLiked: [],
// usersDisliked: [],