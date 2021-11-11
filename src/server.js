const express = require("express");
const app = express();
const config = require("../config");
const knex = require("knex")(config.db);


const setupExpressServer = () => {
  app.use(express.json());

  //  /v1/api/desney/attraction/list endpoint
  //　一覧を取得する
  app.get("/v1/api/desney/attraction/list/", (req, res) => {
    const {limit} = req.params;
  
    if(!isNaN(limit)){
      knex("attraction_info")
      .select()
      .then(function (results) {
      res.send(results);
      
      });
    res.send(attractionList);
    }else{
      knex("attraction_info")
      .select()
      .then(() => {
      res.send(results);
      });
    }
  });
  //　追加する
  app.post("/v1/api/desney/attraction/list", (req, res) => {

    const attractionInfo = req.body;
    console.log(attractionInfo);
    let attractionName = req.body[0].attraction_name;
    let congestionLevel = req.body[0].congestion_level;
    knex("attraction_info")
      .insert({ attraction_name: attractionName, congestion_level: congestionLevel})
      .then(() => {
      res.status(200).end();
    });
  });

  //　更新する
  app.patch("/v1/api/desney/attraction/list/", (req, res) => {
    const attractionId =  req.body[0].id;
    const attractionName =  req.body[0].attraction_name;
    knex("attraction_info")
      .where({ id: attractionId })
      .update({
        attraction_name: attractionName
      })
      .then(() => {
      res.status(200).end();
    });
  });

  //　削除する
  app.delete("/v1/api/desney/attraction/list/", (req, res) => {
    const attractionId =  req.body[0].id;
    knex("attraction_info")
      .where({ id: attractionId })
      .del()
      .then(() => {
      res.status(200).end();
    });  
    });

  return app;
};

module.exports = { setupExpressServer };