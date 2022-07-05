const sauceLogic = require("./likeDislikeSauceLogic");
const likeDislikeSauceLogic = sauceLogic.likeDislikeSauceLogic;

// test suite
describe("testing like/dislike", () => {

    // it("given a user who has created a sauce, when he wants to update like/dislike data, then he cant", () => {
    //     // arrange
    //     const expected = false;
    //     const testInitialSauce = {
    //         _id: "1234",
    //         userId: "x", 
    //         likes: 0, 
    //         dislikes: 0, 
    //         usersLiked: [], 
    //         usersDisliked: [] 
    //     };
    //     const testReqPayload = {
    //         like: 1,
    //         userId: "x"
    //     }
    //     // act
    //     const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
    //     // assert
    //     expect(actual).toBeFalsy();
    // });

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
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
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

    it("given a user who has NOT created a sauce, when he dislikes a sauce that he has already disliked, then it should return false", () => {
        // arrange
        const expected = false;
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: ["x"] 
        };
        const testReqPayload = {
            like: -1,
            userId: "y"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    it("given a user who has NOT created a sauce, when he dislikes a sauce, then the dislikes prop of the sauce is incremented by 1", () => {
        // arrange
        const expected = {$inc: { dislikes: 1 }, $push: { usersDisliked: ["x"] }, _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: -1,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    it("given a user who has NOT created a sauce, when he dislikes a sauce, then his userId should be push to the usersDisliked array", () => {
        // arrange
        const expected = {$inc: { dislikes: 1 }, $push: { usersDisliked: ["x"] }, _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 0, 
            usersLiked: [], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: -1,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    it("given a user who has NOT created a sauce, when he unDislikes a sauce, then the dislikes prop of the sauce is decremented by 1 and his user id added to the pull array under the usersDisliked key", () => {
        // arrange
        const expected = {$inc: { dislikes: -1 }, $pull: { usersDisliked: "x" }, _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 1, 
            usersLiked: [], 
            usersDisliked: ["x"] 
        };
        const testReqPayload = {
            like: 0,
            userId: "x"
        }
        // act
        const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    // it("given a user who has created a sauce, when he dislikes a sauce, then it should return false", () => {
    //     // arrange
    //     const expected = false;
    //     const testInitialSauce = {
    //         _id: "1234",
    //         userId: "y", 
    //         likes: 0, 
    //         dislikes: 1, 
    //         usersLiked: [], 
    //         usersDisliked: ["x"] 
    //     };
    //     const testReqPayload = {
    //         like: -1,
    //         userId: "y"
    //     }
    //     // act
    //     const actual = likeDislikeSauceLogic(testInitialSauce, testReqPayload);
    //     // assert
    //     expect(actual).toBeFalsy();
    // });

    
    it("given a user who has NOT created a sauce, when he likes a sauce that he had already dislikes , then the likes prop of the sauce is incremented by 1  and the dislikes prop decremented by 1 and his userId is added and pull from the right arrays", () => {
        // arrange
        const expected = {$inc: { likes: 1 },$inc: { dislikes: -1 }, $push: { usersLiked: "x" }, $pull: { usersDisliked: "x" },  _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 0, 
            dislikes: 1, 
            usersLiked: [], 
            usersDisliked: ["x"] 
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

    it("given a user who has NOT created a sauce, when he dislikes a sauce that he had already likes , then the dislikes prop of the sauce is incremented by 1  and the likes prop decremented by 1 and his userId is added and pull from the right arrays", () => {
        // arrange
        const expected = {$inc: { likes: -1 },$inc: { dislikes: 1 }, $pull: { usersLiked: "x" }, $push: { usersDisliked: "x" },  _id: "1234"};
        const testInitialSauce = {
            _id: "1234",
            userId: "y", 
            likes: 1, 
            dislikes: 0, 
            usersLiked: ["x"], 
            usersDisliked: [] 
        };
        const testReqPayload = {
            like: -1,
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


// describe.each([
//     [1, 1, 2],
//     [6, 6, 9],
//   ])('if I add %p + %p', (a, b, expected) => {
//     test(`returns ${expected}`, () => {
//       expect(true).toBe(true);
//     });
//   });