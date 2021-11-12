# Desney 待ち時間アプリ

このAPIは、Desneyのアトラクション情報に関するAPIです。

## 対象アトラクション
- カリブの海賊
- ぷーさんのハニーハント
- ジャングルクルーズ


## DB構成
- 施設名　：attraction_name　(例) ぷーさんのハニーハント
- カナ表記　：attraction_name_kana　(例) ぷーさんのはにーはんと
- 通称　：attraction_name_tusho　(例) ハニーハント
- エリア　：area　(例) LAND
- テーマランド　：theme　(例) ファンタジーランド
- 画像パス　：img_pass　(例) /src
- ファストパス対象　：fast_passport　(例) 0  {0:無し　1:有り}
- プライオリティシート対象　：priority_seating　(例) 0  {0:無し　1:有り}
- 現在の待ち時間　：average_waiting_time_during_busy_season　(例) 20　　　　//カラム名を変える時間なかった
- 現在から１０分前の待ち時間　：average_waiting_time_during_low_season　(例) 60　　　//カラム名を変える時間なかった
- 混雑レベル　：congestion_level　(例) E 　 {A:大変混んでいる　B:混んでいる C:普通　D:空いている　E:ガラガラ}
    - ※ 混雑指数をAからEで表現した値
- 所要時間[s]　：ride_time　(例) 15
- 1台あたりの定員　：vehicle_capacity　(例) 6
- 台数　：number_of_vehicles　(例) 3
- 推定総台数　：total_number_of_vehicles　(例) 20
- 発車間隔[s/1set]　：next_interval　(例) 10
- おすすめの対象者　：recommended_person　(例) ファミリー
- レコード作成日　：rec_toroku_date　(例) レコード作成日
- レコード更新日　：rec_koushin_date　(例) レコード更新日

## 各種APIリスト

##アトラクション情報一覧取得
- APi説明
　現在のアトラクション情報を取得します（DBカラム全て）
- APIメソッドとエンドポイント
　`GET /v1/api/desney/attraction/list`
- リクエストボディ
　無し
- レスポンスボディ
　JSON形式 
　DBにある全レコード全カラム（themeと閑散期平均待ち時間の昇順）

##アトラクション情報追加
- APi説明
　現在のアトラクション情報を追加します
- APIメソッドとエンドポイント
　`POST /v1/api/desney/attraction/list`
- リクエストボディ
　JSON形式
- レスポンスボディ
　無し

##アトラクション情報更新
- APi説明
　現在のアトラクション情報を更新します
- APIメソッドとエンドポイント
　`PATCH /v1/api/desney/attraction/list/`
- リクエストボディ
　JSON形式
- レスポンスボディ
　無し

##アトラクション情報削除
- APi説明
　現在のアトラクション情報を更新します
- APIメソッドとエンドポイント
　`DELETE /v1/api/desney/attraction/list/`
- リクエストボディ
　JSON形式
- レスポンスボディ
　無し

###アトラクション１分あたりの待ち時間増加(減少)数を取得
- APi説明
１０分間の待ち時間変化率から１分あたりの待ち時間増加数(減少)を取得
　(現在の待ち時間 - １０分前の待ち時間) /10
- APIメソッドとエンドポイント
　`GET /v1/api/desney/attraction/waitedtime/`
- リクエストボディ
　無し
- レスポンスボディ
JSON形式（timeByMinutesが１分あたりの待ち時間増加数）


