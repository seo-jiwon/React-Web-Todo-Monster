const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const user = require("./Router/user");
const doInput = require("./Router/todolist");
const search = require("./Router/search");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", user);
app.use("/todolist", doInput);
app.use("/search", search);

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});