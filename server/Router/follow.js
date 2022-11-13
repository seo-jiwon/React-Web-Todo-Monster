const express = require("express");
const router = express.Router();
const database = require("../database");
const jwt = require("jsonwebtoken");

router.post("/following", (req, res) => {
    console.log(req.body.authUser);
    console.log(req.body.otherUser);
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
    database.query(
        "INSERT INTO follow(follower_id,following_id) values(?,?) ", [req.body.authUser,req.body.otherUser] ,
        (err, result) => {
            if (err) throw err;
            //등록완료되면 success 1 반환
            return res.send({ success: 1 }), console.log("팔로우 성공");
          }
    );
});

module.exports = router;