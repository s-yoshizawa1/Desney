
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('attraction_info').del()
    .then(function () {
      // Inserts seed entries
      return knex('attraction_info').insert([
        { 
          "id": "1",
          "attraction_name": "カリブの海賊",
          "attraction_name_kana": "かりぶのかいぞく",
          "attraction_name_tusho": "カリブ",
          "area": "TDL",
          "theme": "アドベンチャーランド",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "old_waiting_time": "5",
          "new_waiting_time": "20",
          "congestion_level": "E",
          "ride_time": "15",
          "vehicle_capacity": "20",
          "number_of_vehicles": "2",
          "total_number_of_vehicles": "40",
          "next_interval": "45",
          "recommended_person": "ファミリー",
          "rec_create_date": "2016-7-8 1:23:45.999",
          "rec_updated_date": "2016-7-9 1:23:45.999"
        },
        { 
          "id": "2",
          "attraction_name": "オムニバス",
          "attraction_name_kana": "おむにばす",
          "attraction_name_tusho": "おむにばす",
          "area": "TDL",
          "theme": "ワールドバザール",
          "img_pass": "/src",
          "fast_passport": "0",
          "priority_seating": "0",
          "old_waiting_time": "10",
          "new_waiting_time": "40",
          "congestion_level": "E",
          "ride_time": "6",
          "vehicle_capacity": "33",
          "number_of_vehicles": "1",
          "total_number_of_vehicles": "1",
          "next_interval": "60",
          "recommended_person": "ファミリー",
          "rec_create_date": "2016-7-8 1:23:45.999",
          "rec_updated_date": "2016-7-9 1:23:45.999"
        }
      ]);
    });
};
