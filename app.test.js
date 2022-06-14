const request = require("supertest");
const app = require("./app");

const functionUnderTest = () => "return value";

// test suite
describe("testing jest setup itself", () => {
    // test case
    it('should be green', () => {
        expect(true).toBeTruthy();
    });
    // example test syntax
    it("it should have a correct syntax", () => {
        // 3 steps in a test: arrange, act, assert
        // arrange
        const expected = "return value";
        // act
        const actual = functionUnderTest();
        // assert
        expect(actual).toEqual(expected);
    });
});

describe("all app' endpoints return expected JSONs", () => {

    
    test("it should return a 200 on the base route", () => {
        return request(app)
          .get("/api")
          .expect(200);
    });

    // test("it should return a 401 on sending an empty user id to /api/sauces/:id/like with the expected json", (done) => {
    //         // arrange
    //         const payload = {
    //             sauceId: 1,
    //             userId: '',
    //             like: true
    //         };
    //         const expected = { error: 'Veuillez vous identifier' };
    //         // act and assert
    //         return request(app)
    //             .post("/api/sauces/1/like")
    //             .send(payload)
    //             .then(response => {
    //                 // expect(response.statusCode).toBe(401);
    //                 expect(response.body).toEqual(expected);
    //                 done();
    //             });
    //         });

});


/**
 * 
 * @example
 * 
 * this mocks a dependency that is supposed to call some external service,
 * this also turns the mocked dependency into a spy
 */
// const mockedDep = jest.mock("./some-imported-dep-file-name").fn(() => [
//     {"key":"value1"},
//     {"key":"value2"}
// ]);
// describe("simple test to demo stubbing an external web service call result", () => {

//     it("should return what I stubbed for the API call response", async () => {
//         const expected = [
//             {"key":"value1"},
//             {"key":"value2"}
//         ];
//         const actual = await mockedDep();
//         expect(actual).toEqual(expected);
//     });

//     it("should effectively spy on the API call function", async () => {
//         await doItsThing();
//         expect(mockedDep).toHaveBeenCalledTimes(1);
//     });

// });

// describe("all app' endpoints return expected JSONs", () => {

//     // happy path with a registered route
//     it("should return the expected JSON", async () => {
//         // arrange
//         const expected = {
//             msg: "app' works",
//             payload: null
//         };
//         // act
//         const actual = await request.get('/api');
//         // assert
//         expect(actual.body).toEqual(expected);
//         expect(actual.statusCode).toBe(200);
//     });

//     // unhappy path with not found
//     it("should return a not found JSON response with a wrong HTTP verb", async () => {
//         // arrange
//         const expected = {
//             msg: "not found",
//             payload: null
//         };
//         // act
//         const actual = await request.delete('/api');
//         // assert
//         expect(actual.body).toEqual(expected);
//         expect(actual.statusCode).toBe(404);
//     });

//     it("should return a not found JSON response with a wrong URI", async () => {
//         // arrange
//         const expected = {
//             msg: "not found",
//             payload: null
//         };
//         // act
//         const actual = await request.get('/not-exists');
//         // assert
//         expect(actual.body).toEqual(expected);
//         expect(actual.statusCode).toBe(404);
//     });

// });



