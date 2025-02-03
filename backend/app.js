const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

const port = 3000;

require("./db/conn");

const routes = require("./routes");

app.use("/adm", routes)

app.listen(port, async () => {
  console.log("Servidor conectado " + port);
});
