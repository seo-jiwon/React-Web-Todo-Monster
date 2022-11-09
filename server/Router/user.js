const express = require("express");
const router = express.Router();
const database = require("../database");

//회원가입
router.post("/signup", (req, res) => {
    database.query(
        "INSERT INTO user(email, password) values (?, ?)", [req.body.email, req.body.password],
    function(err){
        if(err){
            console.log(err);
        } else{
            res.send({success : 1});
            console.log("SignUp Success");
        }
    });
});

module.exports = router;