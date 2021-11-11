const express = require("express");
const app = express();
const config = require("../config");
const knex = require("knex")(config.db);
app.set("view engine", "ejs");


const setupExpressServer = () => {
  app.use(express.json());

  //  /v1/api/desney/attraction/list endpoint
  
  app.get( '/', ( req, res ) => {
    res.render( 'test.ejs', { title: 'Desney' } );  
  });

// 　一覧を取得する
  app.get("/v1/api/desney/attraction/list/", (req, res) => {
    const {limit} = req.params;
  
    if(!isNaN(limit)){
      knex("attraction_info")
      .select()
      .then(function (results) {
      // res.send(results);
      res.sendFile('/public/test.html');
      });
    res.send(attractionList);
    }else{
      knex("attraction_info")
      .select()
      .then((results) => {
      // res.send(results);
      res.sendFile(__dirname + '/public/test.html');
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
    const attractionName =  req.body[0].attraction_name;
    knex("attraction_info")
      .where({ id: attractionId })
      .update(req.body)
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

  //  /v1/api/desney/attraction/waitedtime endpoint
  //　一覧を取得する
  app.get("/v1/api/desney/attraction/waitedtime/", (req, res) => {
  
      knex("attraction_info")
      .select("id","attraction_name","congestion_level")
      .then((results) => {
      res.send(results);
      });
  });

  return app;
};

module.exports = { setupExpressServer };