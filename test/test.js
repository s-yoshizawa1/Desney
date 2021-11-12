const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();
const { setupExpressServer  } = require("../src/server");

/*
 * This sprint you will have to create all tests yourself, TDD style.
 * For this you will want to get familiar with chai-http https://www.chaijs.com/plugins/chai-http/
 * The same kind of structure that you encountered in lecture.express will be provided here.
 */
const server = setupExpressServer();
describe("Desney API Server", () => {
  let request;

  beforeEach(() => {
    request = chai.request(server).keepOpen();
  });

  describe("GET /v1/api/desney/attraction/list", () => {
    it("should get all attraction data", async () => {
      //setup
      const expected = [
        { 
          "id": 1,
          "attraction_name": "カリブの海賊",
          "attraction_name_kana": "かりぶのかいぞく",
          "attraction_name_tusho": "カリブ",
          "area": "TDL",
          "theme": "アドベンチャーランド",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "average_waiting_time_during_busy_season": 20,
          "average_waiting_time_during_low_season": 5,
          "congestion_level": "E",
          "ride_time": 15,
          "vehicle_capacity": 20,
          "number_of_vehicles": 2,
          "total_number_of_vehicles": 40,
          "next_interval": 45,
          "recommended_person": "ファミリー"
        },
        { 
          "id": 2,
          "attraction_name": "オムニバス",
          "attraction_name_kana": "おむにばす",
          "attraction_name_tusho": "おむにばす",
          "area": "TDL",
          "theme": "ワールドバザール",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "average_waiting_time_during_busy_season": 40,
          "average_waiting_time_during_low_season": 10,
          "congestion_level": "E",
          "ride_time": 6,
          "vehicle_capacity": 33,
          "number_of_vehicles": 1,
          "total_number_of_vehicles": 1,
          "next_interval": 60,
          "recommended_person": "ファミリー"
        }
      ]
      ;
      //excercise
      const res = await request.get("/v1/api/desney/attraction/list");
      //assert
      JSON.parse(res.text).should.deep.equal(expected);
      request.close();
    });
 　});
});