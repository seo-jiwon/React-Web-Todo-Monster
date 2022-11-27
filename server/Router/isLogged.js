const express = require("express");
const router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');

router.get("/isLogged", (req,res) => {
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })

    //user 검증 후 유저의 id값을 검색해서 id 반환
    database.query('SELECT user_id, email, name, profile_img FROM user WHERE user_id =?', [user.id], (err,result) => {
        if(err) throw err
        console.log("로그인 유저: ", result)
        return res.send({success:1, user: result})
    })
}) 

module.exports = router;