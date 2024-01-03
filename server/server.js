const express = require("express");
// require("./src/config/db.config");
const app = express();
require("dotenv").config()
const cors = require("cors");
const rootRouter = require("../server/src/routers/root.router");
const bodyParser = require("body-parser");
// Set up
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Router
rootRouter(app);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
