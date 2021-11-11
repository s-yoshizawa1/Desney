
// config.jsは、アプリのグローバルな設定ファイルです
const config = require("../config");
// データベースへの接続を初期化し、これを内部の様々なサブモジュールに渡します
const knex = require("knex")(config.db);

// Express サーバの設定
const { setupExpressServer } = require("./server");
const PORT = process.env.PORT || 3000;
const app = setupExpressServer();
app.listen(PORT, () => {

  console.log("Server running on port", PORT);
});

module.exports = knex;