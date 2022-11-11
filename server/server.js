const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookie = require('cookie-parser')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie())

const user = require("./Router/user");
const doInput = require("./Router/todolist");
const search = require("./Router/search");
const isLogged = require("./Router/isLogged");

app.use("/user", user);
app.use("/todolist", doInput);
app.use("/search", search);
app.use("/isLogged", isLogged);

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});