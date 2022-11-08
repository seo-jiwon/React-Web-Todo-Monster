const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const user = require("./Router/user");
const doInput = require("./Router/todolist");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", user);
app.use("/todolist", doInput);

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});