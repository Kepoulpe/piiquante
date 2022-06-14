const saucesCtlr = require("./sauces");
const validateLikeDislikeSaucePayload = saucesCtlr.validateLikeDislikeSaucePayload;

// test suite
describe("testing validating like/dislike payload", () => {

    it("should return the correct error payload when sending an empty user id", () => {
        // arrange
        const expected = { error: 'Veuillez vous identifier' };
        const testPayload = {
            sauceId: 1,
            userId: '',
            like: true
        };
        // act
        const actual = validateLikeDislikeSaucePayload(testPayload);
        // assert
        expect(actual).toEqual(expected);
    });

    it("should return the correct error payload when sending a number for a user id", () => {
        // arrange
        const expected = { error: 'Veuillez vous identifier' };
        const testPayload = {
            sauceId: 1,
            userId: 1,
            like: true
        };
        // act
        const actual = validateLikeDislikeSaucePayload(testPayload);
        // assert
        expect(actual).toEqual(expected);
    });

});