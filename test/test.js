const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();
const { setupServer } = require("../src/server");

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
// const server = setupServer();
describe("Desney API Server", () => {
  let request;
  describe("GET /v1/api/desney/attraction/list", () => {
    it("should get all attraction data", async () => {
      //setup
    　//   id | attraction_name | congestion_level 
    　//   ----+-----------------+------------------
    　//     1 | カリブの海賊    | B
      const expected = {attractionName: 'カリブの海賊',congestion_level: 'B'};
      //excercise
      const res = await request.get("/v1/api/desney/attraction/list");
      //assert
      JSON.parse(res.text).should.deep.equal(expected);
    });
 　});
});