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
    //
    database.query('SELECT email FROM user WHERE user_id =?',[user.user_id], (err,result) => {
        if(err) throw err
        console.log("result : ",result)
        return res.send({success:1})
    })
}) 

module.exports = router;