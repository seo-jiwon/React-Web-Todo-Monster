const express = require("express");
const router = express.Router();
const database = require("../database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/create", (req,res) => {
  console.log(req.body);
  database.query(
    "INSERT INTO monster(user_id, mon_name, mon_level) values (?, ?, ?)",
      [req.body.userId,req.body.name,'1'],
      (err, result) => {
        if (err) throw err;
        //등록완료되면 success 1 반환
        return res.send({success:1});
      }
  )
});


router.post("/monsterInfo", (req,res) => {
  console.log("req.body : ", req.body);
  database.query(
    "SELECT * FROM monster where user_id = ? ", [req.body.userId],
    (err,result) => {
      if(err) throw err;
      return res.send(result), console.log("result : ", result);
    }

  )
});

module.exports = router;