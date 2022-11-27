const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookie = require('cookie-parser');
const _ = require("lodash");

const FILE_UPLOAD_DIR = "uploads";

app.use(express.json());
app.use(require("express-fileupload")());
app.use(express.static("public"));
app.use("/files", express.static(FILE_UPLOAD_DIR));

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

app.post("/file/upload", (req, res) => {
    const file = req.files.file;
    const ext = _.last(file.name.split("."));
    const newFileNm = `${new Date().getTime()}.${ext}`;
    const uploadPath = `${FILE_UPLOAD_DIR}/${newFileNm}`;
    console.log("uploadPath : ", uploadPath);
    file.mv(uploadPath, (err) => {
      if (err) {
        res.send({ code: 400, messages: "file not moved" });
        throw err;
      }
      res.send({
        path: `/files/${newFileNm}`,
      });
    });
  });

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
});