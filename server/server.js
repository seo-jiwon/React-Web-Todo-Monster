const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookie = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookie());

const user = require("./Router/user");
const doInput = require("./Router/todolist");
const search = require("./Router/search");
const isLogged = require("./Router/isLogged");
const category = require("./Router/category");
const follow = require("./Router/follow");
const monster = require("./Router/monster");


app.use("/user", user);
app.use("/todolist", doInput);
app.use("/search", search);
app.use("/isLogged", isLogged);
app.use("/category", category);
app.use("/follow", follow);
app.use("/monster", monster);



const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});