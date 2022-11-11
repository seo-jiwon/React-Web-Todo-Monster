const express = require("express");
const router = express.Router();
const database = require('../database');
const jwt = require('jsonwebtoken');

router.get("/isLogged", (req,res) => {
<<<<<<< HEAD
    console.log("req.cookies.authUser : ", req.cookies.authUser)
=======
>>>>>>> 2e612bf0e0b10dd6cea2f13079bcba101837ca99
    if(!req.cookies.authUser) {
        return res.send({success:0,message: '다시 로그인 해주세요'})
    }
    const user = jwt.verify(req.cookies.authUser, process.env.JWT_SECRET,(err,token) => {
        if(err) return null;
        else return token;
    })
    if(user == null) return res.send({ success:0 })
<<<<<<< HEAD
    console.log("user : ", user.id);
    //user 검증 후 유저의 id값을 검색해서 id 반환
    database.query('SELECT id FROM user WHERE user_id =?',[user.id], (err,result) => {
        if(err) throw err
        console.log("result : ",result)
        return res.send({success:1, user:result})
=======
    //
    database.query('SELECT email FROM user WHERE user_id =?',[user.user_id], (err,result) => {
        if(err) throw err
        console.log("result : ",result)
        return res.send({success:1})
>>>>>>> 2e612bf0e0b10dd6cea2f13079bcba101837ca99
    })
}) 

module.exports = router;