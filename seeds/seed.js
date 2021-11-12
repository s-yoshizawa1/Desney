
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attraction_info').del()
    .then(function () {
      // Inserts seed entries
      return knex('attraction_info').insert([
        { 
          "attraction_name": "カリブの海賊11111",
          "attraction_name_kana": "かりぶのかいぞく",
          "attraction_name_tusho": "カリブ",
          "area": "TDL",
          "theme": "アドベンチャーランド",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "average_waiting_time_during_busy_season": "20",
          "average_waiting_time_during_low_season": "5",
          "congestion_level": "E",
          "ride_time": "15",
          "vehicle_capacity": "20",
          "number_of_vehicles": "2",
          "total_number_of_vehicles": "40",
          "next_interval": "45",
          "recommended_person": "ファミリー"
        },
        { 
          "attraction_name": "オムニバス",
          "attraction_name_kana": "おむにばす",
          "attraction_name_tusho": "おむにばす",
          "area": "TDL",
          "theme": "ワールドバザール",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "average_waiting_time_during_busy_season": "40",
          "average_waiting_time_during_low_season": "10",
          "congestion_level": "E",
          "ride_time": "6",
          "vehicle_capacity": "33",
          "number_of_vehicles": "1",
          "total_number_of_vehicles": "1",
          "next_interval": "60",
          "recommended_person": "ファミリー"
        }
      ]);
    });
};
