const express = require("express");
const app = express();
const config = require("../config");
const knex = require("knex")(config.db);
app.set("view engine", "ejs");


const setupExpressServer = () => {
  // app.use( express.static( "public" ) );
  app.use(express.json());

  //  /v1/api/desney/attraction/list endpoint
  // app.get( '/', ( req, res ) => {
  //   res.render( 'test.ejs', { title: 'Desney' } );  
    // res.sendFile(__dirname + '/index.html');
  // });

// 　一覧を取得する
  app.get("/v1/api/desney/attraction/list/", (req, res) => {
    const {limit} = req.params;
  
    if(!isNaN(limit)){
      knex("attraction_info")
      .select()
      .orderBy('theme','average_waiting_time_during_busy_season')
      .then(function (results) {
      res.send(results);
      // res.sendFile('/public/test.html');
      });
    res.send(attractionList);
    }else{
      knex("attraction_info")
      .select()
      .orderBy('theme','average_waiting_time_during_busy_season')
      .then((results) => {
      res.send(results);
      // res.sendFile('./test');
      });
    }
  });
  //　追加する
  app.post("/v1/api/desney/attraction/list", (req, res) => {

    knex("attraction_info")
      .insert(req.body)
      .then(() => {
      res.status(200).end();
    });
  });

  //　更新する
  app.patch("/v1/api/desney/attraction/list/", (req, res) => {
    const attractionId =  req.body[0].id;
    console.log(attractionId);
    const attractionName =  req.body[0].attraction_name;
    knex("attraction_info")
      .where({ id: attractionId })
      .update('attraction_name', attractionName)
      .then(() => {
      res.status(200).end();
    });
  });

  //　削除する
  app.delete("/v1/api/desney/attraction/list/", (req, res) => {
    const attractionId =  req.body[0].id;
    console.log(attractionId);
    knex("attraction_info")
      .where({ id: attractionId })
      .del()
      .then(() => {
      res.status(200).end();
    });  
  });

  // 　１分あたりの待ち時間増加数を取得する
//   app.get("/v1/api/desney/attraction/waitedtime/", (req, res) => {
//     knex("attraction_info")
//       .select("id","attraction_name","theme","average_waiting_time_during_busy_season","average_waiting_time_during_low_season").limit(1)
//       .then((results) => {
//     console.log(results);
//     let newTime = results[0].average_waiting_time_during_busy_season
//     let lowTime = results[0].average_waiting_time_during_low_season
//     let timeByMinutes = (newTime - lowTime ) / 10;
//     results[0].timeByMinutes = timeByMinutes;
//     res.send(results);  
//     // res.render( 'test.ejs',  req.body[0] );  
//     });
// });
app.get("/v1/api/desney/attraction/waitedtime/", (req, res) => {
  knex("attraction_info")
    .select("id","attraction_name","theme","average_waiting_time_during_busy_season","average_waiting_time_during_low_season").limit(1)
    .then((results) => {
  console.log(results);
  let timeByMinutes;
  let newTime = results[0].average_waiting_time_during_busy_season
  let lowTime = results[0].average_waiting_time_during_low_season
  if(newTime > lowTime){
    timeByMinutes = (newTime - lowTime ) / 10;
  }else{
    timeByMinutes = (lowTime - newTime ) / 10;
  }
  results[0].timeByMinutes = timeByMinutes;
  res.send(results);  
  // res.render( 'test.ejs',  req.body[0] );  
  });
});

  return app;
};

module.exports = { setupExpressServer };
// ■post用
// [
//   { 
//     "attraction_name": "カリブの海賊",
//     "attraction_name_kana": "かりぶのかいぞく",
// 		"attraction_name_tusho": "カリブ",
// 		"area": "TDL",
// 		"theme": "アドベンチャーランド",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "20",
// 		"average_waiting_time_during_low_season": "5",
// 		"congestion_level": "E",
// 		"ride_time": "15",
// 		"vehicle_capacity": "20",
// 		"number_of_vehicles": "2",
// 		"total_number_of_vehicles": "40",
// 		"next_interval": "45",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "オムニバス",
//     "attraction_name_kana": "おむにばす",
// 		"attraction_name_tusho": "おむにばす",
// 		"area": "TDL",
// 		"theme": "ワールドバザール",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "40",
// 		"average_waiting_time_during_low_season": "10",
// 		"congestion_level": "E",
// 		"ride_time": "6",
// 		"vehicle_capacity": "33",
// 		"number_of_vehicles": "1",
// 		"total_number_of_vehicles": "1",
// 		"next_interval": "60",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   }
// ]

// ■更新用
// [
//   { 
// 		"id": "3",
//     "attraction_name": "カリブの海賊111"
//   }
// ]

// ■delete用
// [
//   { 
// 		"id": "3"
//   }
// ]

// ■大量インサート
// [
//   { 
//     "attraction_name": "カリブの海賊",
//     "attraction_name_kana": "かりぶのかいぞく",
// 		"attraction_name_tusho": "カリブ",
// 		"area": "TDL",
// 		"theme": "アドベンチャーランド",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "20",
// 		"average_waiting_time_during_low_season": "5",
// 		"congestion_level": "E",
// 		"ride_time": "15",
// 		"vehicle_capacity": "20",
// 		"number_of_vehicles": "2",
// 		"total_number_of_vehicles": "40",
// 		"next_interval": "45",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "オムニバス",
//     "attraction_name_kana": "おむにばす",
// 		"attraction_name_tusho": "おむにばす",
// 		"area": "TDL",
// 		"theme": "ワールドバザール",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "40",
// 		"average_waiting_time_during_low_season": "10",
// 		"congestion_level": "E",
// 		"ride_time": "6",
// 		"vehicle_capacity": "33",
// 		"number_of_vehicles": "1",
// 		"total_number_of_vehicles": "1",
// 		"next_interval": "60",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "ウエスタンリバー鉄道",
//     "attraction_name_kana": "うえすたんりばーてつどう",
// 		"attraction_name_tusho": "リバ鉄",
// 		"area": "TDL",
// 		"theme": "ワールドバザール",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "29",
// 		"average_waiting_time_during_low_season": "16",
// 		"congestion_level": "E",
// 		"ride_time": "15",
// 		"vehicle_capacity": "100",
// 		"number_of_vehicles": "1",
// 		"total_number_of_vehicles": "1",
// 		"next_interval": "120",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "スペースマウンテン",
//     "attraction_name_kana": "かりぶのかいぞく",
// 		"attraction_name_tusho": "カリブ",
// 		"area": "TDL",
// 		"theme": "アドベンチャーランド",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "20",
// 		"average_waiting_time_during_low_season": "15",
// 		"congestion_level": "A",
// 		"ride_time": "15",
// 		"vehicle_capacity": "20",
// 		"number_of_vehicles": "2",
// 		"total_number_of_vehicles": "40",
// 		"next_interval": "45",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "ジャングルクルーズ：ワイルドライフ・エクスペディション",
//     "attraction_name_kana": "ジャングルクルーズ：ワイルドライフ・エクスペディション",
// 		"attraction_name_tusho": "ジャングルクルーズ",
// 		"area": "TDL",
// 		"theme": "アドベンチャーランド",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "30",
// 		"average_waiting_time_during_low_season": "5",
// 		"congestion_level": "A",
// 		"ride_time": "15",
// 		"vehicle_capacity": "20",
// 		"number_of_vehicles": "1",
// 		"total_number_of_vehicles": "20",
// 		"next_interval": "20",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   },
// 	{ 
//     "attraction_name": "魅惑のチキルーム：スティッチ・プレゼンツ アロハ・エ・コモ・マイ！",
//     "attraction_name_kana": "魅惑のチキルーム：スティッチ・プレゼンツ アロハ・エ・コモ・マイ！",
// 		"attraction_name_tusho": "アロハ・エ・コモ・マイ",
// 		"area": "TDL",
// 		"theme": "アドベンチャーランド",
// 		"img_pass": "/src",
// 		"fast_passport": "0",
// 		"priority_seating": "0",
// 		"average_waiting_time_during_busy_season": "15",
// 		"average_waiting_time_during_low_season": "5",
// 		"congestion_level": "E",
// 		"ride_time": "10",
// 		"vehicle_capacity": "318",
// 		"number_of_vehicles": "1",
// 		"total_number_of_vehicles": "1",
// 		"next_interval": "0",
// 		"recommended_person": "ファミリー",
// 		"rec_create_date": "2016-7-8 1:23:45.999",
// 		"rec_updated_date": "2016-7-8 1:23:45.999"	
//   }
	
// ]