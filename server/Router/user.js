const express = require("express");
const router = express.Router();
const database = require("../database");

// 테스트
router.get('/todo', (req,res) => {
    database.query('SELECT user_num, user_id, password FROM user;', (err, result) => {
        if(err) res.send(err);
        else{
            res.send(result);
            console.log("test");
        }
    });
});

//회원가입
router.post("/signup", (req, res) => {
    database.query(
        "INSERT INTO user(email, password) values (?, ?)", [req.body.email, req.body.password],
    function(err){
        if(err){
            console.log("SignUp Error :" + err);
        } else{
            res.send({success : 1});
            console.log("SignUp Success!");
        }
    });
});

//로그인
router.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    database.query(
        "SELECT email, password FROM user WHERE email = ? and password = ?", [email, password],
    function(err, data){
        if(!data[0]){
            res.send({failure : 1});
            console.log("Login Fail, No matching data...");
        }
        else if(err){
            console.log("Login Error:" + err);
        }
        else {
            res.send({success : 1});
            console.log("Login Success!");
        }
    });
});

module.exports = router;