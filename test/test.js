const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should();
const { setupExpressServer  } = require("../src/server");
// データベースへの接続の初期化
const config = require("../config");
const knex = require("knex")(config.db);

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

  describe("GET /api/v1/desney/attraction/list", () => {
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
          "old_waiting_time": 5,
          "new_waiting_time": 20,
          "congestion_level": "E",
          "ride_time": 15,
          "vehicle_capacity": 20,
          "number_of_vehicles": 2,
          "total_number_of_vehicles": 40,
          "next_interval": 45,
          "recommended_person": "ファミリー",
          "rec_create_date": "2016-07-07T16:23:45.999Z",
          "rec_updated_date": "2016-07-08T16:23:45.999Z"
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
          "old_waiting_time": 10,
          "new_waiting_time": 40,
          "congestion_level": "E",
          "ride_time": 6,
          "vehicle_capacity": 33,
          "number_of_vehicles": 1,
          "total_number_of_vehicles": 1,
          "next_interval": 60,
          "recommended_person": "ファミリー",
          "rec_create_date": "2016-07-07T16:23:45.999Z",
          "rec_updated_date": "2016-07-08T16:23:45.999Z"
        }
      ];
      //excercise
      const res = await request.get("/api/v1/desney/attraction/list");
      //assert
      JSON.parse(res.text).should.deep.equal(expected);
      request.close();
    });

    it("should get selected attraction data", async () => {
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
          "old_waiting_time": 5,
          "new_waiting_time": 20,
          "congestion_level": "E",
          "ride_time": 15,
          "vehicle_capacity": 20,
          "number_of_vehicles": 2,
          "total_number_of_vehicles": 40,
          "next_interval": 45,
          "recommended_person": "ファミリー",
          "rec_create_date": "2016-07-07T16:23:45.999Z",
          "rec_updated_date": "2016-07-08T16:23:45.999Z"
        }
      ];
      //excercise
      const res = await request.get("/api/v1/desney/attraction/list/1");
      // console.log(res + "aaaaaa");
      
      //assert
      JSON.parse(res.text).should.deep.equal(expected);
      request.close();
    });
 　});

 describe("POST /api/v1/desney/attraction/list", () => {
  it("should create single data", async () => {
    //setup
    const createData = [
    { 
      "id": 3,
      "attraction_name": "プーさんのハニーハント",
      "attraction_name_kana": "ぷーさんのはにーはんと",
      "attraction_name_tusho": "ハニーハント",
      "area": "TDL",
      "theme": "アドベンチャーランド",
      "img_pass": "/src",
      "fast_passport": "  ",
      "priority_seating": " ",
      "old_waiting_time": 50,
      "new_waiting_time": 80,
      "congestion_level": "B",
      "ride_time": 15,
      "vehicle_capacity": 20,
      "number_of_vehicles": 2,
      "total_number_of_vehicles": 40,
      "next_interval": 45,
      "recommended_person": "ファミリー",
      "rec_create_date": "2016-07-07T16:23:45.999Z",
      "rec_updated_date": "2016-07-08T16:23:45.999Z"
    }
  ]
    const expected = [
      { 
        "id": 3,
        "attraction_name": "プーさんのハニーハント",
        "attraction_name_kana": "ぷーさんのはにーはんと",
        "attraction_name_tusho": "ハニーハント",
        "area": "TDL",
        "theme": "アドベンチャーランド",
        "img_pass": "/src",
        "fast_passport": "  ",
        "priority_seating": " ",
        "old_waiting_time": 50,
        "new_waiting_time": 80,
        "congestion_level": "B",
        "ride_time": 15,
        "vehicle_capacity": 20,
        "number_of_vehicles": 2,
        "total_number_of_vehicles": 40,
        "next_interval": 45,
        "recommended_person": "ファミリー",
        "rec_create_date": "2016-07-07T16:23:45.999Z",
        "rec_updated_date": "2016-07-08T16:23:45.999Z"
      }
    ];
    //excercise
    const res = await request.post("/api/v1/desney/attraction/list").send(createData);;
    //assert
    const res2 = await request.get("/api/v1/desney/attraction/list/3");
    //assert
    JSON.parse(res2.text).should.deep.equal(expected);
    request.close();
    //tear down
    await knex.seed.run({ directory: "seeds" });
    });
　});
 

 describe("PATCH /api/v1/desney/attraction/list", () => {
  it("should update single data", async () => {
    //setup
    const updateData = [{"id": 1,"attraction_name": "スティッチ"}];
    const expected = [
      { 
        "id": 1,
        "attraction_name": "スティッチ",
        "attraction_name_kana": "かりぶのかいぞく",
        "attraction_name_tusho": "カリブ",
        "area": "TDL",
        "theme": "アドベンチャーランド",
        "img_pass": "/src",
        "fast_passport": "0",
        "priority_seating": "0",
        "old_waiting_time": 5,
        "new_waiting_time": 20,
        "congestion_level": "E",
        "ride_time": 15,
        "vehicle_capacity": 20,
        "number_of_vehicles": 2,
        "total_number_of_vehicles": 40,
        "next_interval": 45,
        "recommended_person": "ファミリー",
        "rec_create_date": "2016-07-07T16:23:45.999Z",
        "rec_updated_date": "2016-07-08T16:23:45.999Z"
      }
    ];
    //excercise
    const res = await request.patch("/api/v1/desney/attraction/list").send(updateData);;
    //assert
    const res2 = await request.get("/api/v1/desney/attraction/list/1");
    //assert
    JSON.parse(res2.text).should.deep.equal(expected);
    request.close();
    //tear down
    await knex.seed.run({ directory: "seeds" });
    });
　});

 describe("DELETE /api/v1/desney/attraction/list", () => {
  it("should delete data", async () => {
    //setup
    const deleteId = [{id: 2}];
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
        "old_waiting_time": 5,
        "new_waiting_time": 20,
        "congestion_level": "E",
        "ride_time": 15,
        "vehicle_capacity": 20,
        "number_of_vehicles": 2,
        "total_number_of_vehicles": 40,
        "next_interval": 45,
        "recommended_person": "ファミリー",
        "rec_create_date": "2016-07-07T16:23:45.999Z",
        "rec_updated_date": "2016-07-08T16:23:45.999Z"
      }
    ]
    ;
    //excercise
    const res = await request.delete("/api/v1/desney/attraction/list").send(deleteId);;
    //assert
    const res2 = await request.get("/api/v1/desney/attraction/list");
    //assert
    JSON.parse(res2.text).should.deep.equal(expected);
    request.close();
    //tear down
    await knex.seed.run({ directory: "seeds" });
    });
　});

describe("DELETE /api/v1/desney/attraction/list", () => {
  it("should delete data", async () => {
    //setup
    const deleteId = [{id: 2}];
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
        "old_waiting_time": 5,
        "new_waiting_time": 20,
        "congestion_level": "E",
        "ride_time": 15,
        "vehicle_capacity": 20,
        "number_of_vehicles": 2,
        "total_number_of_vehicles": 40,
        "next_interval": 45,
        "recommended_person": "ファミリー",
        "rec_create_date": "2016-07-07T16:23:45.999Z",
        "rec_updated_date": "2016-07-08T16:23:45.999Z"
      }
    ]
    ;
    //excercise
    const res = await request.delete("/api/v1/desney/attraction/list").send(deleteId);;
    //assert
    const res2 = await request.get("/api/v1/desney/attraction/list");
    //assert
    JSON.parse(res2.text).should.deep.equal(expected);
    request.close();
    //tear down
    await knex.seed.run({ directory: "seeds" });
    });
　});
});