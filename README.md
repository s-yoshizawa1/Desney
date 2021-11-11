# Desney 待ち時間アプリ

このアプリは、Desneyのアトラクション待ち時間に関するAPIを作成します。

# 対象アトラクション

# DB構成
施設名　：attraction_name
カナ表記　：attraction_name_kana
通称　：attraction_name_tusho
エリア　：area
テーマランド　：theme
場所　：location
画像パス　：img_pass
ファストパス対象　：fast_passport
プライオリティシート対象　：priority_seating
繁忙期平均待ち時間　：average_waiting_time_during_busy_season
閑散期平均待ち時間　：average_waiting_time_during_low_season
混雑指数　：congestion_index
    ※ 繁忙期平均待ち時間から導出した偏差値
混雑レベル　：congestion_level
    ※ 混雑指数をAからEで表現した値
所要時間[s]　：ride_time
1台あたりの定員　：vehicle_capacity
台数　：number_of_vehicles
推定総台数　：total_number_of_vehicles
発車間隔[s/1set]　：next_interval
おすすめの対象者　：recommended_person
レコード作成日　：rec_toroku_date
レコード更新日　：rec_koushin_date

# 各種APIリスト
- `GET /v1/api/desney/attraction/list`
  - Desneyのアトラクションリストを返します。
  - `/v1/api/desney/attraction/list?limit = n` で`n` 個のアトラクションのみを返す事が出来ます。